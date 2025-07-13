// src/redux/userSlice.ts
import { createSlice } from '@reduxjs/toolkit';

export type UserState = {
  id: string | null;           // Unique player ID
  username: string | null;     // Player's username
  highScore: number;           // Player's all-time high score
  totalGamesPlayed: number;    // Total games played
  rank: string | null;         // Optional: global or friend rank
  isAuthenticated: boolean;    // Are they signed in?
};

const initialState: UserState = {
  id: null,
  username: null,
  highScore: 0,
  totalGamesPlayed: 0,
  rank: null,
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
      state.rank = null;
      state.isAuthenticated = false;
    },
    updateProfile: (state, action) => {
      if (action.payload.username) state.username = action.payload.username;
      if (action.payload.rank) state.rank = action.payload.rank;
    },
    updateHighScore: (state, action) => {
      if (action.payload > state.highScore) {
        state.highScore = action.payload;
      }
    },
    incrementGamesPlayed: (state) => {
      state.totalGamesPlayed += 1;
    },
  },
});

export const {
  login,
  logout,
  updateProfile,
  updateHighScore,
  incrementGamesPlayed,
} = userSlice.actions;

export default userSlice.reducer;
