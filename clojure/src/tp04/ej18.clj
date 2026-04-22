(ns tp04.ej18
  "Ejercicio 18 — Integrador Clojure (7 pts). Trazabilidad: F-33")

;; {:ok true :value orden} si activa y total > 100. Error si no.
(defn clasificar-orden [orden]
  (cond
    (not (:activa? orden)) {:ok false :error "orden inactiva"}
    (<= (:total orden) 100) {:ok false :error "monto insuficiente"}
    :else {:ok true :value orden})
  )

;; Retorna nueva orden con total reducido por porcentaje.
(defn aplicar-descuento [porcentaje orden]
  (update orden :total #(int (* % (- 1 (/ porcentaje 100)))))
  )

;; Pipeline: clasificar → separar → descuento 10% → sumar.
;; Retorna {:aprobadas [...] :rechazadas [...] :total-final N}
(defn procesar-ordenes [ordenes]
  (let [resultados (map clasificar-orden ordenes)
        aprobadas (->> resultados
                       (filter :ok)
                       (map :value))
        rechazadas (->> resultados
                        (remove :ok)
                        (map :error))
        aprobadas-desc (map #(aplicar-descuento 10 %) aprobadas)
        total-final (reduce + 0 (map :total aprobadas-desc))]
    {:aprobadas (vec aprobadas-desc)
     :rechazadas (vec rechazadas)
     :total-final total-final})
  )
