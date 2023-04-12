import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../store/store'
import { onCloseDateModal, onOpenDateModal } from '../store/ui/uiSlice'

export const useUIStore = () => {
  const dispatch = useAppDispatch()
  const { isDateModalOpen } = useSelector((state: RootState) => state.ui)

  const onOpenDateModalH = () => dispatch(onOpenDateModal())
  const onCloseDateModalH = () => dispatch(onCloseDateModal())

  return {
    isDateModalOpen,
    onOpenDateModalH,
    onCloseDateModalH
  }
}
