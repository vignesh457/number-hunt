import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// ALERT SLICE ----------------------------
interface AlertState {
  visible: boolean;
  type: 'success' | 'error' | 'warning';
  message: string;
}

const initialAlertState: AlertState = {
  visible: false,
  type: 'success',
  message: '',
};

const alertSlice = createSlice({
  name: 'alert',
  initialState: initialAlertState,
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

// POPUP SLICE ----------------------------
interface PopupState {
  visible: boolean;
  title: string;
  message: string;
  confirmType?: string;
}

const initialPopupState: PopupState = {
  visible: false,
  title: '',
  message: '',
  confirmType: ''
};

const popupSlice = createSlice({
  name: 'confirm',
  initialState: initialPopupState,
  reducers: {
    showPopup: (
      state,
      action: PayloadAction<{
        title: string;
        message: string;
        confirmType?: string;
      }>
    ) => {
      state.visible = true;
      state.title = action.payload.title;
      state.message = action.payload.message;
      state.confirmType = action.payload.confirmType
    },
    hidePopup: (state) => {
      state.visible = false;
      state.title = '';
      state.message = '';
      state.confirmType = '';
    },
  },
});

// EXPORTS ----------------------------
export const { showAlert, hideAlert } = alertSlice.actions;
export const { showPopup, hidePopup } = popupSlice.actions;

export const alertReducer = alertSlice.reducer;
export const popupReducer = popupSlice.reducer;
