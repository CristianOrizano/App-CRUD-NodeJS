export interface UsuarioRequest {
    nombre: string;
    apellido: string;
    email: string;
    password: string;
  }
  
  export interface UsuarioResponse {
    id: number;
    email: string;
    role: string;
  }

  export interface UsuarioLogin {
    email: string;
    password: string;
  }






