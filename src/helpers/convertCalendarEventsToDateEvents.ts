import { parseISO } from 'date-fns'
import { IBigCalendarEvent } from '../calendar/types/CalendarTypes'

export const convertCalendarEventsToDateEvents = (events: IBigCalendarEvent[]): IBigCalendarEvent[] => {
  return events.map((event) => {
    return {
      ...event,
      start: parseISO(event.start.toString()),
      end: parseISO(event.end.toString())
    //   start: new Date(event.start),
    //   end: new Date(event.end)
    }
  })
}
