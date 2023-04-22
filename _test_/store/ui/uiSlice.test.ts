import { uiSlice } from '../../../src/store/ui/uiSlice'
describe('testing uiSlice', () => {
  test('should return the initial state', () => {
    expect(uiSlice.name).toBe('ui')
    // expect(uiSlice.getInitialState()).toEqual({ isDateModalOpen: false })
    expect(uiSlice.getInitialState().isDateModalOpen).toBe(false)
  })
  test('should change the state of isDateModalOpen', () => {
    /* Action open */
    const state = uiSlice.getInitialState()
    const actionOpen = uiSlice.actions.onOpenDateModal()
    const newStateOpen = uiSlice.reducer(state, actionOpen)
    expect(newStateOpen.isDateModalOpen).toBe(true)
    /* Action close  */
    const actionClose = uiSlice.actions.onCloseDateModal()
    const newState2 = uiSlice.reducer(newStateOpen, actionClose)
    expect(newState2.isDateModalOpen).toBe(false)
  })
})
