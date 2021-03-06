<template>
<main>
  <div class="terminal">
    <div class="tabs">
      <div @click="selectTab('input')"
        :class="selectedTab === 'input' ? 'selected' : 'not-selected'">INPUT
      </div>
      <div @click="selectTab('output')"
        :class="selectedTab === 'output' ? 'selected' : 'not-selected'">OUTPUT
      </div>
    </div>

    <textarea v-model="input" rows="12" spellcheck="false"
      v-show="selectedTab === 'input'">
    </textarea>
    <textarea v-model="output" rows="12" spellcheck="false" readonly
      v-show="selectedTab === 'output'">
    </textarea>

    <div class="terminal-controls">
      <button @click="runClick()">Run</button>
      <button @click="clearConsole()">Clear Output</button>
    </div>
  </div>
</main>
</template>

<script lang="ts">
import {
  Component,
  Vue,
} from 'vue-property-decorator';

interface Instruction {
  name: string;
  code: number;
}
type tabs = 'input' | 'output';

@Component({})
export default class Emulator extends Vue {
  rom: number[] = []; // parsed program instructions to be read
  continue = true;
  pc = 0; // program counter
  stack: number[] = [];
  registers = [
    0,
    0,
    0,
    0,
  ];
  readonly registersList: Instruction[] = [
    { name: 'R1', code: 0 },
    { name: 'R2', code: 1 },
    { name: 'R3', code: 2 },
    { name: 'R4', code: 3 },
  ];
  readonly instructionsList: Instruction[] = [
    { name: 'MOVR', code: 10 },
    { name: 'MOVV', code: 11 },
    { name: 'ADD', code: 20 },
    { name: 'SUB', code: 21 },
    { name: 'PUSH', code: 30 },
    { name: 'POP', code: 31 },
    { name: 'JUMP', code: 40 },
    { name: 'JLT', code: 41 },
    { name: 'CALL', code: 42 },
    { name: 'RETURN', code: 50 },
    { name: 'PRINT', code: 60 },
    { name: 'HALT', code: 255 },
  ];

  input = 'MOVV r1 10\nMOVV r2 10\nADD r1 r2\nPRINT r1\nHALT';
  output = '';
  selectedTab: tabs = 'input';

  runClick() {
    const instructionsList = this.instructionsList.concat(this.registersList);
    this.rom = Emulator.assemble(this.input, instructionsList);
    this.runProgram();
    this.selectTab('output');
  }

  /*** EMULATOR INTERFACE LAYER ***/
  printToUserConsole(message: string) {
    this.output += `${message}\n`;
  }

  clearConsole() {
    this.output = '';
  }
  selectTab(tab: tabs): void {
    this.selectedTab = tab;
  }
  /*** INTERFACE LAYER END ***/

  /*** EMULATOR LOGIC ***/
  execute(instruction: number): void {
    switch (instruction) {
      // copies value from 1 register to another
      // TODO - should it clear instead of copy???
      case 10: { // MOVR - Move Register
        const destination = this.rom[this.pc + 1];
        const source = this.rom[this.pc + 2];

        if (!Emulator.argumentIsValid(destination, this.registersList)) {
          return this.stopProgram(`Invalid destination: ${destination}`);
        } else if (!Emulator.argumentIsValid(source, this.registersList)) {
          return this.stopProgram(`Invalid source: ${source}`);
        }

        this.registers[destination] = this.registers[source];
        this.pc += 3;
        break;
      }
      // set arbitrary number value in register
      case 11: { // MOVV - Move Value
        const destination = this.rom[this.pc + 1];
        const value = this.rom[this.pc + 2];

        if (!Emulator.argumentIsValid(destination, this.registersList)) {
          return this.stopProgram(`Invalid destination: ${destination}`);
        }

        this.registers[destination] = value;
        this.pc += 3;
        break;
      }
      // add one registers value to another
      case 20: { // ADD
        const destination = this.rom[this.pc + 1];
        const source = this.rom[this.pc + 2];

        if (!Emulator.argumentIsValid(destination, this.registersList)) {
          return this.stopProgram(`Invalid destination: ${destination}`);
        } else if (!Emulator.argumentIsValid(source, this.registersList)) {
          return this.stopProgram(`Invalid source: ${source}`);
        }

        this.registers[destination] += this.registers[source];
        this.pc += 3;
        break;
      }
      // subtract one registers value from another
      case 21: { // SUB
        const destination = this.rom[this.pc + 1];
        const source = this.rom[this.pc + 2];

        if (!Emulator.argumentIsValid(destination, this.registersList)) {
          return this.stopProgram(`Invalid destination: ${destination}`);
        } else if (!Emulator.argumentIsValid(source, this.registersList)) {
          return this.stopProgram(`Invalid source: ${source}`);
        }

        this.registers[destination] -= this.registers[source];
        this.pc += 3;
        break;
      }
      // push a registers value to the end of the stack
      case 30: { // PUSH
        const source = this.rom[this.pc + 1];

        if (!Emulator.argumentIsValid(source, this.registersList)) {
          return this.stopProgram(`Invalid source: ${source}`);
        } else if (this.stack.length >= 256) {
          return this.stopProgram('Stack overflow!');
        }

        this.stack.push(this.registers[source]);
        this.pc += 2;
        break;
      }
      // move the last value from the stack to a register
      case 31: { // POP
        const destination = this.rom[this.pc + 1];

        if (!Emulator.argumentIsValid(destination, this.registersList)) {
          return this.stopProgram(`Invalid destination: ${destination}`);
        } else if (this.stack.length === 0) {
          return this.stopProgram('Stack underflow!');
        }

        // type coersion safe becuase its checked that it won't be undefined
        this.registers[destination] = this.stack.pop() as number;
        this.pc += 2;
        break;
      }
      // Jump execution to an arbitrary address
      case 40: { // JUMP
        const address = this.rom[this.pc + 1];
        const instructionAtAddress = this.rom[address];

        if (!Emulator.argumentIsValid(instructionAtAddress, this.instructionsList)) {
          return this.stopProgram(`Invalid JUMP destination: ${instructionAtAddress}`);
        }

        this.pc = address;
        break;
      }
      // if (r1 < r2) JUMP; else continue
      case 41: { // JLT - Jump Less Than
        const register1 = this.rom[this.pc + 1];
        const register2 = this.rom[this.pc + 2];
        const address = this.rom[this.pc + 3];
        const instructionAtAddress = this.rom[address];

        if (!Emulator.argumentIsValid(register1, this.registersList)) {
          return this.stopProgram(`Ivalid register at argument 1: ${register1}`);
        } else if (!Emulator.argumentIsValid(register2, this.registersList)) {
          return this.stopProgram(`Ivalid register at argument 2: ${register2}`);
        } else if (!Emulator.argumentIsValid(instructionAtAddress, this.instructionsList)) {
          return this.stopProgram(`Invalid JUMP destination: ${instructionAtAddress}`);
        }

        if (this.registers[register1] < this.registers[register2]) this.pc = address;
        else this.pc += 4;
        break;
      }
      // push next address to stack then jumps to argument
      // e.g. to call a function and be able to continue where you left off with RETURN
      case 42: { // CALL
        const address = this.rom[this.pc + 1];
        const instructionAtAddress = this.rom[address];

        if (!Emulator.argumentIsValid(instructionAtAddress, this.instructionsList)) {
          return this.stopProgram(`Invalid JUMP destination: ${instructionAtAddress}`);
        }

        this.stack.push(this.pc + 2);
        this.pc = address;
        break;
      }
      // pop the last item from the stack and jump to it
      // to be used with CALL
      case 50: { // RETURN
        if (this.stack.length === 0) {
          return this.stopProgram('Stack underflow!');
        }

        // type coersion safe becuase its checked that it won't be undefined
        const address = this.stack.pop() as number;
        const instructionAtAddress = this.rom[address];

        if (!Emulator.argumentIsValid(instructionAtAddress, this.instructionsList)) {
          return this.stopProgram(`Invalid RETURN destination: ${instructionAtAddress}`);
        }

        this.pc = address;
        break;
      }
      // prints value of register provided
      case 60: { // PRINT
        const register = this.rom[this.pc + 1];

        if (!Emulator.argumentIsValid(register, this.registersList)) {
          return this.stopProgram(`Ivalid PRINT register: ${register}`);
        }

        this.printToUserConsole(`${this.registers[register]}`);
        this.pc += 2;
        break;
      }
      // stops program and acts as reset
      case 255: { // HALT
        this.stopProgram('PROGRAM COMPLETE');
        break;
      }
      // catch all, hopefully from user error
      default: {
        this.stopProgram(`Error reading instruction ${instruction}`);
      }
    }
  }

  static argumentIsValid(argument: number, whiteList: Instruction[]) {
    return whiteList.some((item) => {
      return item.code === argument;
    });
  }

  static assemble(input: string, instructions: Instruction[]): number[] {
    // remove whitespace and newline characters
    // turn text into an array of instructions
    const trimmedInput = input.trim().replace(/[\r\n]+/gm, ' ');
    const inputArray = trimmedInput.split(' ').filter((word) => word !== '');

    return inputArray.map((word) => {
      let mappedWord = 0;

      // turn user readable commands into their number codes
      // without overriding other 'words'
      instructions.find((instruction) => {
        if (word.toUpperCase() === instruction.name) {
          mappedWord = instruction.code;
          return instruction;
        }
        return false;
      });

      // handle remaining non-user-command inputs
      if (mappedWord === 0) {
        mappedWord = parseInt(word, 10);
        // invalid inputs just returned as 0
        if (Number.isNaN(mappedWord)) mappedWord = 0;
      }

      return mappedWord;
    });
  }

  runProgram() {
    this.printToUserConsole('START...');
    this.continue = true;

    while (this.continue && this.pc < this.rom.length) {
      this.execute(this.rom[this.pc]);
    }
    if (this.continue && this.pc >= this.rom.length) {
      this.stopProgram('PROGRAM COMPLETE');
    }
  }

  stopProgram(message: string) {
    this.continue = false;
    this.pc = 0;
    this.registers = [0, 0, 0, 0];
    this.stack = [];
    this.printToUserConsole(message);
  }
  /*** EMULATOR LOGIC CODE END ***/

}
</script>

<style lang="scss" scoped>
@import '~@/styles/main.scss';
@import '~@/styles/emulator.scss';

.terminal {
  color: $text-color;
  margin: 1rem 10rem;
  display: flex;
  flex-direction: column;

  textarea {
    color: inherit;
    font-size: 1rem;
    font-family: "Roboto Mono", monospace;
    background-color: black;
    border: 2px solid $border-color;
    text-align: start;
  }

}
.terminal-controls {
  display: flex;
  justify-content: flex-start;
}
button:first-of-type {
  margin-left: 0;
}
.tabs {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  & div {
    border: 2px solid $border-color;
    border-bottom: none;
    background-color: black;
    padding: 4px 8px;
    margin: 0 8px;

    &:first-of-type {
      margin-left: 0;
    }
    &:hover {
      cursor: pointer;
    }
  }
  & .not-selected {
    color: $text-color-dark;
    background-color: #222;
    border-color: $border-color-dark;
  }
}

@media only screen and (max-width: 899px) {
  .terminal {
    margin: 1rem;
  }
}
</style>
