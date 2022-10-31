/* eslint-disable no-constant-condition */
function exemplo0(initial: number) {
  let counter = initial
  while (true) {
    if (counter < 0) {
      break
    }
    console.log('Counter:', counter--)
  }
  return
}

//tail call
function exemplo1(state: number): void {
  if (state <= 0) {
    return
  }
  console.log('Counter:', state)
  return exemplo1(state - 1)
}

function imperativo2(quantity: number): void {
  let state = 0
  while (true) {
    if (state > quantity) {
      break
    }
    console.log('Counter:', state)
    state = state + 1
  }
}

function recursivo2(quantity: number, state = 0): void {
  if (state > quantity) {
    return
  }
  console.log('Counter:', state)
  return recursivo2(quantity, state + 1)
}

function sumImperativa(steps: number): number {
  let quantity = steps
  let accumulator = 0
  while (true) {
    if (quantity <= 0) {
      return accumulator
    }
    quantity = quantity - 1
    accumulator = accumulator + quantity
  }
}

function sum(quantity: number, accumulator = 0): number {
  if (quantity <= 0) {
    return accumulator
  }
  return sum(quantity - 1, accumulator + quantity)
}

function inverter(data: number[]): number[] {
  if (data.length <= 0) {
    return data
  }
  const [head, ...tail] = data
  return [...inverter(tail), head]
}

function inverter2(data: number[], state: number[] = []): number[] {
  if (data.length <= 0) {
    return state
  }
  const [head, ...tail] = data
  return inverter2(tail, [head, ...state])
}

/*
function fibonacciRecursivo(a: number, b: number, quantity: number): void {
  if (state > quantity) {
    return
  }
  console.log('Counter:', state)
  return recursivo2(quantity, state + 1)
}*/

const resultado = inverter2([1, 2, 3])
console.log(resultado)
