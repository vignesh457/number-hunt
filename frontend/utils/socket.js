// src/utils/socket.js
import { io } from "socket.io-client";

// ✅ Replace with your backend URL
export const socket = io("http://192.168.1.7:3000", {
  transports: ["websocket"], // reliable for Expo
});
