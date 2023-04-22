import { IBigCalendarEvent } from '../../src/calendar/types/CalendarTypes'
export const eventsState = [
  {
    id: '1',
    start: new Date('2023-04-17 12:00:00'),
    end: new Date('2023-04-17 14:00:00'),
    title: 'Cumpleaños del jefe',
    notes: 'My event notes'
  },
  {
    id: '2',
    start: new Date('2023-04-18 12:00:00'),
    end: new Date('2023-04-18 14:00:00'),
    title: 'Cumpleaños del Antonio',
    notes: 'My event notes'
  }
]

export const initialState = {
  isLoadingEvents: true,
  events: <IBigCalendarEvent[]>[],
  activeEvent: <IBigCalendarEvent>{}
}

export const calendarWithEvents = {
  isLoadingEvents: false,
  events: eventsState,
  activeEvent: <IBigCalendarEvent>{}
}

export const calendarWithActiveEventState = {
  isLoadingEvents: false,
  events: eventsState,
  activeEvent: { ...eventsState[1] }
}
