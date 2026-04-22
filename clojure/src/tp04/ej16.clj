(ns tp04.ej16
  "Ejercicio 16 — DSL data-driven (5 pts). Trazabilidad: F-31"
  (:require [clojure.string :as str]))

;; Vector de reglas: {:field :name, :pred fn, :msg "..."}
(def user-rules
  [{:field :name
    :pred #(not (str/blank? %))
    :msg "nombre vacío"}
   
   {:field :email
    :pred #(str/includes? % "@")
    :msg "email inválido"}
   
   {:field :age
    :pred #(>= % 18)
    :msg "menor de edad"}])

;; Aplica todas las reglas a data. Retorna vector de {:field :error} (vacío si ok).
(defn validate [rules data]
  (reduce
    (fn [acc {:keys [field pred msg]}]
      (let [value (get data field)]
        (if (pred value)
          acc
            (conj acc {:field field :error msg}))))
    []
    rules)
  )

;; true si no hay errores.
(defn valid? [rules data]
  (empty? (validate rules data))
  )
