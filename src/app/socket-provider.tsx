"use client";
import { Socket } from "phoenix";
import React, { ReactNode, createContext, useEffect, useState } from "react";

const wsUrl = `${process.env.NEXT_PUBLIC_WEBSOCKET_HOST}/socket`;

const SocketContext = createContext<Socket | null>(null);
interface SocketProviderProps {
  children: ReactNode;
}

const SocketProvider = ({ children }: SocketProviderProps) => {
  const [skt, setSkt] = useState<Socket>();

  useEffect(() => {
    const socket = new Socket(wsUrl, { params: {}, transport: WebSocket });
    socket.connect();
    setSkt(socket);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!skt) return null;

  return (
    <SocketContext.Provider value={skt}>{children}</SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
