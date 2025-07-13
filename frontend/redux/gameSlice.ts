// src/redux/gameSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type GameMode = 'friend' | 'ai' | 'global';

export interface Player {
  id: string;
  name: string;
  isHost: boolean;
}

export interface GameState {
  isMyTurn: boolean;
  round: number;
  myScore: number;
  opponentScore: number;
  totalRounds: number;
  mode: GameMode;
  roomCode: string;
  players: Player[];
}

const initialState: GameState = {
  myScore: 0,
  opponentScore: 0,
  round: 1,
  totalRounds: 5,
  isMyTurn: false,
  mode: 'friend',
  roomCode: '',
  players: [],
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
    }>) => {
      if (action.payload.totalRounds !== undefined) {
        state.totalRounds = action.payload.totalRounds;
      }
      if (action.payload.mode !== undefined) {
        state.mode = action.payload.mode;
      }
      if (action.payload.roomCode !== undefined) {
        state.roomCode = action.payload.roomCode;
      }
      if (action.payload.players !== undefined) {
        state.players = action.payload.players;
      }
    },
    addMyPoints: (state, action: PayloadAction<number>) => {
      state.myScore += action.payload;
    },
    addOpponentPoints: (state, action: PayloadAction<number>) => {
      state.opponentScore += action.payload;
    },
    toggleTurn: (state) => {
      state.isMyTurn = !state.isMyTurn;
    },
    nextRound: (state) => {
      state.round += 1;
    },
    resetGame: () => initialState,
  },
});

export const {
  setGameConfig,
  addMyPoints,
  addOpponentPoints,
  toggleTurn,
  nextRound,
  resetGame,
} = gameSlice.actions;

export default gameSlice.reducer;
