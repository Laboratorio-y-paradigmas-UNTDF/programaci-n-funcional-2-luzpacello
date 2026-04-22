// Ejercicio 3 — Inmutabilidad con spread (4 pts)
// Trazabilidad: F-09

export type Persona = {
  readonly nombre: string;
  readonly edad: number;
  readonly hobbies: readonly string[];
};

export type User = {
  readonly name: string;
  readonly email: string;
};

// Devuelve nueva persona con edad + 1.
export function cumpleanios(p: Persona): Persona {
  const persona = {... p, edad: p.edad + 1};
  return persona;
}

// Devuelve nueva persona con hobby agregado al final.
export function agregarHobby(p: Persona, hobby: string): Persona {
  const persona: Persona = {... p, hobbies: [ ... p.hobbies, hobby]
  };
  return persona;
}

// Devuelve nueva persona con nombre actualizado.
export function actualizarNombre(p: Persona, nombre: string): Persona {
  const persona = {... p, nombre: nombre};
  return persona;
}

// Trim name, toLowerCase + trim email. Retorna nuevo objeto.
export function normalizeUser(u: User): User {
  let nuevoName = u.name.trim();
  let nuevoEmail = u.email.trim().toLowerCase();
  const user = {
    ... u, name: nuevoName, email: nuevoEmail}
  
    return user;
}
