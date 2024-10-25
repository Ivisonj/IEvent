import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface scannerModalState {
  modalState: boolean
}

const initialState = {
  modalState: false,
}

const scannerModal = createSlice({
  name: 'Scanner modal',
  initialState,
  reducers: {
    selectModalState(
      state: scannerModalState,
      action: PayloadAction<{ modalState: boolean }>,
    ) {
      state.modalState = action.payload.modalState
    },
  },
})

export default scannerModal.reducer

export const { selectModalState } = scannerModal.actions
