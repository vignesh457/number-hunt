import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LeaderboardEntry {
    userId: string;
    rank: number;
    highscore: number;
}

interface LeaderboardState {
    entries: LeaderboardEntry[];
}

const initialState: LeaderboardState = {
    entries: [],
};

const leaderboardSlice = createSlice({
    name: 'leaderboard',
    initialState,
    reducers: {
        setLeaderboard(state, action: PayloadAction<LeaderboardEntry[]>) {
            state.entries = action.payload;
        },
    },
});

export const { setLeaderboard } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;
