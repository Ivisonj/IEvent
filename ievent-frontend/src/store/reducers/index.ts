import { combineReducers } from 'redux'
import menu from './menu'
import selectForm from './selectForm'
import calendarDate from './calendarDate'
import scannerModal from './scannerModal'
import userQrCodeModal from './userQrCodeModal'
import attendance from './attendance'

const reducers = combineReducers({
  menu,
  selectForm,
  calendarDate,
  scannerModal,
  userQrCodeModal,
  attendance,
})

export default reducers
