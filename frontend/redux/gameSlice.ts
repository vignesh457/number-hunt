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
  myPoints: number;
  opponentPoints: number;
  roomCode: string;
  players: Player[];
  grid: number[];
}

const initialState: GameState = {
  mode: 'friend',
  myPoints: 0,
  opponentPoints: 0,
  roomCode: '',
  players: [],
  grid: [6, 13, 78, 25, 74, 72, 68, 1, 46, 35, 89, 53, 54, 39, 100, 29, 95, 14, 20, 38, 79, 55, 2, 30, 71, 51, 3, 64, 92, 96, 81, 75, 10, 34, 65, 90, 41, 98, 26, 83, 31, 9, 12, 24, 43, 18, 45, 5, 67, 97, 42, 62, 7, 80, 27, 48, 15, 59, 37, 19, 23, 36, 77, 56, 49, 99, 22, 87, 82, 44, 85, 84, 11, 70, 63, 21, 86, 60, 57, 50, 66, 52, 16, 17, 40, 88, 28, 47, 32, 73, 4, 8, 91, 33, 58, 93, 94, 76, 61, 69]
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
    setMyPoints: (state, action: PayloadAction<number>) => {
      state.myPoints = state.myPoints+action.payload;
    },
    setOpponentPoints: (state, action: PayloadAction<number>) => {
      state.opponentPoints = state.opponentPoints+action.payload;
    },
    resetGame: () => initialState,
  },
});

export const {
  setGameConfig,
  setMyPoints,
  setOpponentPoints,
  resetGame,
} = gameSlice.actions;

export default gameSlice.reducer;
