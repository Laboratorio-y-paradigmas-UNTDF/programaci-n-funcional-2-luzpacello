// Ejercicio 14 — Memoization (5 pts)
// Trazabilidad: F-28, F-29

// Memoize genérico para funciones de 1 argumento. Usa Map como cache.
export function memoize<T, R>(fn: (arg: T) => R): (arg: T) => R {
  const cache = new Map<T, R>();
  return (arg: T): R => {
    if (cache.has(arg)) return cache.get(arg)!;
    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
}

// Fibonacci recursivo clásico (sin memo).
export function fibonacci(n: number): number {
  return n <= 1 ? n : fibonacci(n - 1) + fibonacci(n -2);
}

// Wrapper que cuenta llamadas. Retorna { call, count }.
export function callCounter<A extends unknown[], R>(fn: (...args: A) => R): {
  call: (...args: A) => R;
  count: () => number;
} {
  let count = 0;
  return {
    call: (...args: A): R => {
      count++;
      return fn(...args);
    },
    count: () => count,
  };
}
