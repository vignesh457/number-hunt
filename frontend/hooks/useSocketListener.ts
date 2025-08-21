// src/hooks/useSocketListeners.ts
import { useEffect } from "react";
import { socket } from "@/utils/socket";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setGameConfig } from "@/redux/gameSlice";
import { showAlert } from "@/redux/uiSlice";

export const useSocketListeners = () => {
  const dispatch = useAppDispatch();
  // console.log("useSocketListeners called");

  useEffect(() => {
    // console.log(`useEffect called for roomCode: ${roomCode} and socket: ${socket.id}`);
    socket.on("room_updated", ({ status, players, message}) => {
      // console.log(`${message} - players: ${JSON.stringify(players)}`);
      dispatch(showAlert({ type: status, message }));
      dispatch(setGameConfig({ players }));
      // console.log("players:", gamePlayers);
    });
    
  }, []);
};
