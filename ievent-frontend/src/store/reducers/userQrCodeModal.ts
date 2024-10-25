import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface userQrCodeModalState {
  modalState: boolean
}

const initialState = {
  modalState: false,
}

const userQrCodeModal = createSlice({
  name: 'User QrCode modal',
  initialState,
  reducers: {
    selectUserQrCodeModalState(
      state: userQrCodeModalState,
      action: PayloadAction<{ modalState: boolean }>,
    ) {
      state.modalState = action.payload.modalState
    },
  },
})

export default userQrCodeModal.reducer

export const { selectUserQrCodeModalState } = userQrCodeModal.actions
