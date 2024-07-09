export interface EmpleadoRequest {
    nombre: string;
    apellido: string;
    sueldo: number;
    fechaNacimiento: string;
    telefono: number;
  }
  
  export interface EmpleadoResponse {
    id: number;
    nombre: string;
    apellido: string;
    sueldo: number;
    fechaNacimiento: string;
    telefono: number;
  }