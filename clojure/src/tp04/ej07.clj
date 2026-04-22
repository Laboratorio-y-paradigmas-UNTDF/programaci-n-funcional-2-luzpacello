(ns tp04.ej07
  "Ejercicio 7 — Partial en Clojure (5 pts). Trazabilidad: F-15"
  (:require [clojure.string :as str]))

;; Retorna {:status :ok :value value} si no vacío, {:status :error :error "FIELD es obligatorio"}.
(defn required-field [field-name value]
  (if (seq (clojure.string/trim value))
    {:status :ok :value value}
    {:status :error :error (str field-name " es obligatorio")}
    )
  )

(defn multiply [factor n] (* factor n))

(def doble
  (partial multiply 2)
  )

(def triple
  (partial multiply 3)
  )

(def validate-name
  (partial required-field "nombre")
  )

(def validate-email
  (partial required-field "email")
  )
