import { calendarSlice } from '../../../src/store/calendar/calendarSlice'
import { calendarWithActiveEventState, calendarWithEvents, eventsState, initialState } from '../../fixtures/calendarStates'
describe('Pruebas en calendarSlice', () => {
  test('should return the initialState', () => {
    const state = calendarSlice.getInitialState()
    expect(state).toEqual(initialState)
  })
  test('should define the active event', () => {
    const actionEvent = calendarSlice.actions.onSetActiveNote(calendarWithActiveEventState.activeEvent)
    const newState = calendarSlice.reducer(calendarWithEvents, actionEvent)
    expect(newState.activeEvent).toEqual(calendarWithActiveEventState.activeEvent)
  })
  test('should add a new event in calendar', () => {
    const actionEvent = calendarSlice.actions.onAddNewEvent(eventsState[0])
    const newState = calendarSlice.reducer(initialState, actionEvent)
    expect(newState.events).toEqual([eventsState[0]])
  })
  test('should update the event', () => {
    const updateEventValue = { ...eventsState[0], title: 'cumpleaños del tester' }
    const expectedState = [updateEventValue, eventsState[1]]
    const actionEvent = calendarSlice.actions.onUpdateEvent(updateEventValue)
    const newState = calendarSlice.reducer(calendarWithEvents, actionEvent)
    expect(newState.events).toEqual(expectedState)
  })

  test('should delete event in calendar', () => {
    const eventToDelete = { ...eventsState[0] }
    const expectState = [eventsState[1]]
    const actionEvent = calendarSlice.actions.onDeleteEvent(eventToDelete)
    const newState = calendarSlice.reducer(calendarWithEvents, actionEvent)
    expect(newState.events).toEqual(expectState)
  })

  test('should load the events', () => {
    const actionEvent = calendarSlice.actions.onLoadEvents(eventsState)
    const newState = calendarSlice.reducer(initialState, actionEvent)
    expect(newState).toEqual(calendarWithEvents)
  })
  test('should reset the values onLogout', () => {
    const action = calendarSlice.actions.onLogoutCalendar()
    const newState = calendarSlice.reducer(calendarWithEvents, action)
    expect(newState.events.length).toBe(0)
  })
})
