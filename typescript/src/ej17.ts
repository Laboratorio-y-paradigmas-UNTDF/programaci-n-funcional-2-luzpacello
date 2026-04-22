// Ejercicio 17 — Integrador TypeScript (7 pts)
// Trazabilidad: F-33

export type Orden = {
  id: number;
  cliente: string;
  total: number;
  categoria: string;
  activa: boolean;
};

export type Result<T, E> = { status: "ok"; value: T } | { status: "error"; error: E };

// ok si activa Y total > 100. err("orden inactiva") o err("monto insuficiente").
export function clasificarOrden(o: Orden): Result<Orden, string> {
  if (!o.activa) {
    return { status: "error", error: "orden inactiva" };
  }

  if (o.total <= 100) {
    return { status: "error", error: "monto insuficiente" };
  }

  return { status: "ok", value: o };
}

// Partial: retorna fn que crea nueva orden con total reducido por porcentaje.
export function aplicarDescuento(porcentaje: number): (o: Orden) => Orden {
  return (o: Orden): Orden => ({
    ...o,
    total: o.total * (1 - porcentaje / 100),
  });
}

// Pipeline: clasificar → separar ok/err → descuento 10% a aprobadas → sumar totales.
export function procesarOrdenes(ordenes: Orden[]): {
  aprobadas: Orden[];
  rechazadas: string[];
  totalFinal: number;
} {
  const resultados = ordenes.map(clasificarOrden);

  const { aprobadas, rechazadas } = resultados.reduce(
    (acc, r) =>
      r.status === "ok"
        ? {
            ...acc,
            aprobadas: [...acc.aprobadas, r.value],
          }
        : {
            ...acc,
            rechazadas: [...acc.rechazadas, r.error],
          },
    { aprobadas: [] as Orden[], rechazadas: [] as string[] }
  );

  const aplicar10 = aplicarDescuento(10);

  const aprobadasConDesc = aprobadas.map(aplicar10);

  const totalFinal = aprobadasConDesc.reduce(
    (acc, o) => acc + o.total,
    0
  );

  return {
    aprobadas: aprobadasConDesc,
    rechazadas,
    totalFinal,
  };
}
