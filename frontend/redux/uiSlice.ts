import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AlertState {
  visible: boolean;
  type: 'success' | 'error' | 'warning';
  message: string;
}

const initialState: AlertState = {
  visible: false,
  type: 'success',
  message: '',
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: (
      state,
      action: PayloadAction<{ type: 'success' | 'error' | 'warning'; message: string }>
    ) => {
      state.visible = true;
      state.type = action.payload.type;
      state.message = action.payload.message;
    },
    hideAlert: (state) => {
      state.visible = false;
      state.message = '';
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;
