<template>
  <main></main>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  Watch,
} from 'vue-property-decorator';

interface instruction {
  name: string;
  code: number;
}
interface register extends instruction {
}

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
  readonly registersList: register[] = [
    { name: 'r0', code: 0 },
    { name: 'r1', code: 1 },
    { name: 'r2', code: 2 },
    { name: 'r3', code: 3 },
  ];
  readonly instructionsList: instruction[] = [
    { name:'MOVR', code: 10 },
    { name:'MOVV', code: 11 },
    { name:'ADD', code: 20 },
    { name:'SUB', code: 21 },
    { name:'PUSH', code: 30 },
    { name:'POP', code: 31 },
    { name:'JUMP', code: 40 },
    { name:'JLT', code: 41 },
    { name:'CALL', code: 42 },
    { name:'RETURN', code: 50 },
    { name:'PRINT', code: 60 },
    { name:'HALT', code: 255 },
  ];
  str = 'MOVV 10 r1 MOVV 10 r2 ADD r1 r2 PRINT r1 HALT';

  excecute(instruction: number) {
    switch(instruction) {
      // copies value from 1 register to another
      case 10: { // MOVR - Move Register
        const destination = this.rom[this.pc + 1];
        const source = this.rom[this.pc + 2];

        if (!this.argumentIsValid(destination, this.registersList)) {
          return this.stopProgram(`Invalid destination: ${destination}`);
        } else if (!this.argumentIsValid(source, this.registersList)){
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

        if (!this.argumentIsValid(destination, this.registersList)) {
          return this.stopProgram(`Invalid destination: ${destination}`);
        } else if (typeof value !== 'number') { // TODO remove check after impementing compiler
          return this.stopProgram(`Invalid argument ${this.rom[this.pc + 2]} must be an integer.`);
        }

        this.registers[destination] = value;
        this.pc += 3;
        break;
      }
      // add one registers value to another
      case 20: { // ADD
        const destination = this.rom[this.pc + 1];
        const source = this.rom[this.pc + 2];

        if (!this.argumentIsValid(destination, this.registersList)) {
          return this.stopProgram(`Invalid destination: ${destination}`);
        } else if (!this.argumentIsValid(source, this.registersList)) {
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

        if (!this.argumentIsValid(destination, this.registersList)) {
          return this.stopProgram(`Invalid destination: ${destination}`);
        } else if (!this.argumentIsValid(source, this.registersList)) {
          return this.stopProgram(`Invalid source: ${source}`);
        }

        this.registers[destination] -= this.registers[source];
        this.pc += 3;
        break;
      }
      // push a registers value to the end of the stack
      case 30: { // PUSH
        const source = this.rom[this.pc + 1];

        if (!this.argumentIsValid(source, this.registersList)) {
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

        if (!this.argumentIsValid(destination, this.registersList)) {
          return this.stopProgram(`Invalid destination: ${destination}`);
        } else if (this.stack.length === 0) {
          return this.stopProgram('Error empty stack!');
        }

        // type coersion safe becuase its checked that it won't be undefined
        this.registers[destination] = this.stack.pop() as number;
        this.pc += 2;
        break;
      }
      // Jump excecution to an arbitrary address
      case 40: { // JUMP
        const address = this.rom[this.pc + 1];
        const instructionAtAddress = this.rom[address];

        if (!this.argumentIsValid(instructionAtAddress, this.instructionsList)) {
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

        if (!this.argumentIsValid(register1, this.registersList)) {
          return this.stopProgram(`Ivalid register at argument 1: ${register1}`);
        } else if (!this.argumentIsValid(register2, this.registersList)) {
          return this.stopProgram(`Ivalid register at argument 2: ${register2}`);
        } else if (!this.argumentIsValid(instructionAtAddress, this.instructionsList)) {
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

        if (!this.argumentIsValid(instructionAtAddress, this.instructionsList)) {
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
          return this.stopProgram('Error empty stack!');
        }

        // type coersion safe becuase its checked that it won't be undefined
        const address = this.stack.pop() as number;
        const instructionAtAddress = this.rom[address];

        if (!this.argumentIsValid(instructionAtAddress, this.instructionsList)) {
          return this.stopProgram(`Invalid RET destination: ${instructionAtAddress}`);
        }

        this.pc = address;
        break;
      }
      // prints value of register provided
      case 60: { // PRINT
        const register = this.rom[this.pc + 1];

        if (!this.argumentIsValid(register, this.registersList)) {
          return this.stopProgram(`Ivalid register to PRINT: ${register}`);
        }

        this.printToUserConsole(`${this.registers[register]}`);
        break;
      }
      // stops program and acts as reset
      case 255: { // HALT
        this.stopProgram('...END');
        break;
      }
      // catch all, hopefully from user error
      default: {
        console.log(`Error reading instruction ${instruction}`);
      }
    }
  }

  runProgram() {
    this.printToUserConsole('START...');
    this.continue = true;

    while(this.continue && this.rom.length) {
      this.excecute(this.rom[this.pc]);
    }
    this.printToUserConsole('PROGRAM COMPLETE');
  }

  stopProgram(message: string) {
    this.continue = false;
    this.pc = 0;
    this.registers = [0, 0, 0, 0];
    this.stack = [];
    this.printToUserConsole(message);
  }

  printToUserConsole(message: string) {
    console.log(message);
  }

  argumentIsValid(argument: number, whiteList: instruction[]) {
    return whiteList.some((item) => {
      return item.code === argument;
    });
  }

}
</script>

<style lang="scss" scoped>

</style>
