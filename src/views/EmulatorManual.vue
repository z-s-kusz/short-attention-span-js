<template>
<main>
  <h1>Z468 Reference Manual</h1>
  <p>The architecture of the Z468 takes inspiration from the
    <a href="http://www.zachtronics.com/tis-100/" target="_blank">TIS-100</a> and the
    <a href="https://dev.to/codeguppy/implement-an-emulator-for-a-fantasy-cpu-in-javascript-3617"
      target="_blank">CPU-3617</a>.
  </p>

  <ul>
    <li v-for="keyword in keywords" :key="keyword.name">
      <a :href="`#${keyword.name}`">{{ keyword.name }}</a>
    </li>
  </ul>

  <section v-for="keyword in keywords" :key="keyword.name">
    <h2>
      <a :name="keyword.name">{{ keyword.name }}</a>
    </h2>
    <p>Arguments >> {{ keyword.arguments }}</p>
    <p>Description >> {{ keyword.description }}</p>
    <hr>
  </section>

</main>
</template>

<script lang="ts">
import {
  Component,
  Vue,
} from 'vue-property-decorator';

interface Keyword {
  name: string;
  code: string;
  arguments: string;
  description: string;
}

@Component({})
export default class Emulator extends Vue {
  readonly keywords: Keyword[] = [
    {
      name: 'MOVR',
      code: '10',
      arguments: 'arg1: register, arg2: register',
      description: `Copies value from one register to another.
        arg1 is the destination, arg2 is the source.
        [Name origin: MOVR = (Mov)e (R)egister]`,
    },
    {
      name: 'MOVV',
      code: '11',
      arguments: 'arg1: register, arg2: number',
      description: 'Stores number value into a register. [Name origin: MOVV = (Mov)e (V)alue]',
    },
    {
      name: 'ADD',
      code: '20',
      arguments: 'arg1: register, arg2: register',
      description: `Adds value from 2 registers and stores it.
        arg1 is the destination. arg1 = arg1 + arg2.`,
    },
    {
      name: 'SUB',
      code: '21',
      arguments: 'arg1: register, arg2: register',
      description: `Subtracts value from 2 registers and stores it.
        arg1 is the destination. arg1 = arg1 - arg2.`,
    },
    {
      name: 'PUSH',
      code: '30',
      arguments: 'arg1: register',
      description: 'Takes the value from a register and adds it to the top of the stack.',
    },
    {
      name: 'POP',
      code: '31',
      arguments: 'arg1: register',
      description: 'Takes the value at the top of the stack and stores it in a register.',
    },
    {
      name: 'JUMP',
      code: '40',
      arguments: 'arg1: number',
      description: `Jumps execution to a specified point.
        Note: each command and  each argument to those commands counts as a point. Points are 0 indexed.
        To jump to the first point use "JUMP 0".`,
    },
    {
      name: 'JLT',
      code: '41',
      arguments: 'arg1: register, arg2: register, arg3: number',
      description: `Jump to a point only if arg1 is less than arg2.
        Else continue to the next point. [name origin JLT = (J)ump (L)ess (T)han]`,
    },
    {
      name: 'CALL',
      code: '42',
      arguments: 'arg1: number',
      description: '(PUSH)es next instruction to the top of the stack then jumps to point arg1.',
    },
    {
      name: 'RETURN',
      code: '50',
      arguments: 'none',
      description: '(JUMP)s to the point (POP)ed from the stack.',
    },
    {
      name: 'PRINT',
      code: '60',
      arguments: 'arg1: register',
      description: 'Prints value from register to OUTPUT.',
    },
    {
      name: 'HALT',
      code: '255',
      arguments: 'none',
      description: 'Stops the program and resets the program state.',
    },
    {
      name: 'registers',
      code: 'R1, R2, R3, R4',
      arguments: 'n/a',
      description: 'Registers 1 - 4. Accessed as "R1", "R2", "R3", "R4". Used to store values.',
    },
    {
      name: 'stack',
      code: '',
      arguments: 'n/a',
      description: 'An array of values. Can be accessed via PUSH and POP.',
    },
  ];
}
</script>

<style lang="scss" scoped>
@import '~@/styles/main.scss';
@import '~@/styles/emulator.scss';

main {
  text-align: start;
  margin: 8vw;
}
</style>
