export interface ProductoResponse {
    id: number;
    nombre: string;
    descripcion: string;
    stock: number;
    precio: number;
    idCategoria: number;
    estado: boolean;
  }

  export interface ProductoRequest {
    nombre: string;
    descripcion: string;
    stock: number;
    precio: number;
    idCategoria: number;
  }