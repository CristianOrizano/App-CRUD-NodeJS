import cors from 'cors';

const corsOptions = {
  origin: 'http://localhost:5173', // Reemplaza con la URL de tu cliente
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
};

export default cors(corsOptions);
