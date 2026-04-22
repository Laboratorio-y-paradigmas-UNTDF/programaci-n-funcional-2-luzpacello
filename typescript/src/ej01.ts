// Ejercicio 1 — Pipeline filter/map/reduce (5 pts)
// Trazabilidad: F-04, F-05, F-10

export type Orden = {
  id: number;
  cliente: string;
  total: number;
  categoria: string;
  activa: boolean;
};

// Filtra órdenes activas, extrae totales y los suma.
export function filtrarActivasYSumar(ordenes: Orden[]): number {
  return ordenes
    .filter((orden) => orden.activa) //filtra los objetos activos
    .reduce((acc, orden) => acc + orden.total, 0); // acumula la suma de los totales
}

// Filtra las activas y devuelve un array con sus totales.
export function obtenerTotalesActivas(ordenes: Orden[]): number[] {
  return ordenes
    .filter(orden => orden.activa) //filtra los objetos activos
    .map(orden => orden.total); //transforma el objeto Orden en solo un num total
}

// Cuenta cuántas órdenes hay por cada categoría (usar reduce).
export function contarPorCategoria(ordenes: Orden[]): Record<string, number> {
  return ordenes.reduce((acc, orden) => ({
    ...acc,
    [orden.categoria]: (acc[orden.categoria] || 0) + 1,
  }), {} as Record<string, number>);
}
