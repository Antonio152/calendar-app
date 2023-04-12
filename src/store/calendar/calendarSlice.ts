import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IBigCalendarEvent } from '../../calendar/types/CalendarTypes'
import { addHours } from 'date-fns'

// const tempEvents = {
//   _id: new Date().getTime(),
//   title: 'Cumnpleaños del jefe',
//   start: new Date(),
//   end: addHours(new Date(), 2),
//   bgcolor: '#fafafa',
//   notes: 'My event notes',
//   user: {
//     _id: '123',
//     name: 'Antonio'
//   }
// }

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    isLoadingEvents: true,
    events: <IBigCalendarEvent[]>[],
    activeEvent: <IBigCalendarEvent>{}
  },
  reducers: {
    onSetActiveNote: (state, { payload }: PayloadAction<IBigCalendarEvent>) => {
      state.activeEvent = payload
    },
    onAddNewEvent: (state, { payload }: PayloadAction<IBigCalendarEvent>) => {
      state.events.push(payload)
      state.activeEvent = {
        title: '',
        start: new Date(),
        end: addHours(new Date(), 2),
        notes: ''
      }
    },
    onUpdateEvent: (state, { payload }: PayloadAction<IBigCalendarEvent>) => {
      state.events = state.events.map(e => (e.id === payload.id ? payload : e))
    },
    onDeleteEvent: (state, { payload }: PayloadAction<IBigCalendarEvent>) => {
      state.events = state.events.filter(e => e.id !== payload.id)
      state.activeEvent = {
        title: '',
        start: new Date(),
        end: addHours(new Date(), 2),
        notes: ''
      }
    },
    onLoadEvents: (state, { payload }: PayloadAction<IBigCalendarEvent[]>) => {
      state.isLoadingEvents = false
      payload.forEach((event) => {
        const exist = state.events.some(e => e.id === event.id)
        if (!exist) {
          state.events.push(event)
        }
      })
      // state.events = payload
    },
    onLogoutCalendar: (state) => {
      state.events = []
      state.activeEvent = {
        title: '',
        start: new Date(),
        end: addHours(new Date(), 2),
        notes: ''
      }
      state.isLoadingEvents = true
    }
  }
})

// Action creators are generated for each case reducer function
export const { onSetActiveNote, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar } = calendarSlice.actions
