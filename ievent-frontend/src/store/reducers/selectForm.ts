import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface selectFormState {
  isLoginForm: boolean
}

const initialState = {
  isLoginForm: true,
}

const selectForm = createSlice({
  name: 'select Form',
  initialState,
  reducers: {
    selectedCurrentForm(
      state: selectFormState,
      action: PayloadAction<{ isLoginForm: boolean }>,
    ) {
      state.isLoginForm = action.payload.isLoginForm
    },
  },
})

export default selectForm.reducer

export const { selectedCurrentForm } = selectForm.actions
