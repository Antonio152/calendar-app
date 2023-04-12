import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../store/store'
import { IBigCalendarEvent, IGetEvents } from '../calendar/types/CalendarTypes'
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveNote, onUpdateEvent } from '../store/calendar/calendarSlice'
import { calendarAPI } from '../api/calendarAPI'
import { IUseCalendarStore } from './types/useCalendarStoreTypes'
import { convertCalendarEventsToDateEvents } from '../helpers/convertCalendarEventsToDateEvents'
import Swal from 'sweetalert2'

export const useCalendarStore = () => {
  const dispatch = useAppDispatch()
  const { user } = useSelector((state: RootState) => state.auth)
  const { events, activeEvent } = useSelector((state: RootState) => state.calendar)

  const onSetActiveNoteH = (event: IBigCalendarEvent) => {
    dispatch(onSetActiveNote(event))
  }

  const onSaveCalendarEvent = async (eventCalendar: IBigCalendarEvent) => {
    try {
      if (eventCalendar.id) {
        // Update event
        await calendarAPI.put(`/events/${eventCalendar.id}`, eventCalendar)
        dispatch(onUpdateEvent({ ...eventCalendar, user: { _id: user.uid, ...user } }))
        return
      }
      // Add event
      const { data }:IUseCalendarStore = await calendarAPI.post('/events', eventCalendar)
      dispatch(onAddNewEvent({ ...eventCalendar, id: data.newEvent.id, user: { _id: user.uid, ...user } }))
    } catch (error) {
      console.log(error)
      Swal.fire('Error', 'Error al guardar el evento', 'error')
    }
  }

  const onDeleteEventH = async (event: IBigCalendarEvent) => {
    try {
      await calendarAPI.delete(`/events/${event.id}`)
      dispatch(onDeleteEvent(event))
    } catch (error) {
      console.log(error)
      Swal.fire('Error', 'Error al eliminar el evento', 'error')
    }
  }

  const startLoadingEvents = async () => {
    try {
      const { data }:IGetEvents = await calendarAPI.get('/events')
      const events = convertCalendarEventsToDateEvents(data.events)
      dispatch(onLoadEvents(events))
    } catch (error) {
      console.log(error)
      Swal.fire('Error', 'Error al cargar los eventos', 'error')
    }
  }
  return {
    events,
    activeEvent,
    onSetActiveNoteH,
    onSaveCalendarEvent,
    onDeleteEventH,
    startLoadingEvents
  }
}
