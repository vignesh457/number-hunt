// src/redux/userSlice.ts
import { createSlice } from '@reduxjs/toolkit';

export type UserState = {
  id: string | null;           // Unique player ID
  username: string | null;     // Player's username
  email?: string | null;         // Player's email
  highScore: number;           // Player's all-time high score
  totalGamesPlayed: number;    // Total games played
  winCount: number;            // Number of wins
  lossCount: number;           // Number of losses
  rank: number;         // Optional: global or friend rank
  isAuthenticated: boolean;    // Are they signed in?
};

const initialState: UserState = {
  id: null,
  username: null,
  email: "---",
  highScore: 0,
  totalGamesPlayed: 0,
  winCount: 0,
  lossCount: 0,
  rank: 0,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.id = null;
      state.username = null;
      state.highScore = 0;
      state.totalGamesPlayed = 0;
      state.winCount = 0;
      state.lossCount = 0;
      state.rank = 0;
      state.isAuthenticated = false;
    },
    updateProfile: (state, action) => {
      if (action.payload.username) state.username = action.payload.username;
    },
    updateRank: (state, action) => {
      state.rank = action.payload.rank;
    },
    updateHighScore: (state, action) => {
      if (action.payload > state.highScore) {
        state.highScore = action.payload;
      }
    },
    incrementGamesPlayed: (state) => {
      state.totalGamesPlayed += 1;
    },
    incrementWinCount: (state) => {
      state.winCount += 1;
    },
    incrementLossCount: (state) => {
      state.lossCount += 1;
    },
  },
});

export const {
  login,
  logout,
  updateProfile,
  updateRank,
  updateHighScore,
  incrementGamesPlayed,
  incrementWinCount,
  incrementLossCount,
} = userSlice.actions;

export default userSlice.reducer;
