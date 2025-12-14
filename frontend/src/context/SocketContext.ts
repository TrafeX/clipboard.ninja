import { createContext } from 'react';
import { io } from 'socket.io-client';

export const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL as string, {autoConnect: false});
export const SocketContext = createContext(socket);
