// src/utils/socket.js
import { io } from "socket.io-client";

// ✅ Replace with your backend URL
export const socket = io("https://number-hunt-g5fp.onrender.com", {
  transports: ["websocket"], // reliable for Expo
});
//
// https://number-hunt-1.onrender.com http://192.168.1.3:3000