import { createContext } from 'react';
import { io } from 'socket.io-client';

export const socket = io(process.env.REACT_APP_BACKEND_URL);
export const SocketContext = createContext(socket);