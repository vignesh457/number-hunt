// src/redux/gameSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type GameMode = 'friend' | 'ai' | 'global';

export interface Player {
  id: string;
  name: string;
  isHost: boolean;
}

export interface GameState {
  mode: GameMode;
  roomCode: string;
  players: Player[];
  grid: number[];
}

const initialState: GameState = {
  mode: 'friend',
  roomCode: '',
  players: [],
  grid: [],
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameConfig: (state, action: PayloadAction<{
      totalRounds?: number;
      mode?: GameMode;
      roomCode?: string;
      players?: Player[];
      grid?: number[];
    }>) => {
      if (action.payload.mode !== undefined) {
        state.mode = action.payload.mode;
      }
      if (action.payload.roomCode !== undefined) {
        state.roomCode = action.payload.roomCode;
      }
      if (action.payload.players !== undefined) {
        state.players = action.payload.players;
      }
      if (action.payload.grid !== undefined) {
        state.grid = action.payload.grid;
      }
    },
    resetGame: () => initialState,
  },
});

export const {
  setGameConfig,
  resetGame,
} = gameSlice.actions;

export default gameSlice.reducer;
