import React, { useEffect, useState } from 'react'
import { Calendar, EventPropGetter, View } from 'react-big-calendar'
import { Navbar } from '../components/Navbar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { localizer } from '../../helpers/CalendarLocalizer'
import { messagesEs } from '../../helpers/getMessages'
import { IBigCalendarEvent } from '../types/CalendarTypes'
import './CalendarCSS.css'
import { CalendarModalEvent } from '../components/CalendarModalEvent'
import { CalendarEvent } from '../components/CalendarEvent'
import { useCalendarStore } from '../../hooks/useCalendarStore'
import { useUIStore } from '../../hooks/useUIStore'
import { FabAddNew } from '../components/FabAddNew'
import { useAuthStore } from '../../hooks/useAuthStore'

export const CalendarPage = () => {
  /* Hooks that use store */
  const { user } = useAuthStore()
  const { onOpenDateModalH } = useUIStore()
  const { onSetActiveNoteH, startLoadingEvents } = useCalendarStore()
  /* Simple useState */
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')
  const { events } = useCalendarStore()

  const eventStyleGetter:EventPropGetter<IBigCalendarEvent> = (event:IBigCalendarEvent) => {
    const isMyEvent = (user.uid === event.user?._id)

    const style = {
      backgroundColor: isMyEvent ? '#367CF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white'
    }
    return {
      style
    }
  }

  const onDoubleClick = (event:IBigCalendarEvent) => {
    onOpenDateModalH()
  }
  const onSelectEvent = (event:IBigCalendarEvent) => {
    onSetActiveNoteH(event)
  }
  const onViewChange = (event:View) => {
    localStorage.setItem('lastView', event)
    setLastView(event)
  }
  /* Load events */
  useEffect(() => {
    startLoadingEvents()
  }, [])

  return (
    <div className="bodyCalendar">
      <Navbar />

      <Calendar
        localizer={localizer}
        culture='es'// Define the language according to localizer configuration
        events={events} // Events to show in the calendar
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages={messagesEs()} // Messages to show in the calendar, it rename the buttons of month, week, day, etc.
        defaultView={lastView as View}// Default view of the calendar
        eventPropGetter={eventStyleGetter} // Style of the event that is shown in the calendar
        components={{
          event: CalendarEvent
        }} // Component that show information when you click on the event
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={onSelectEvent}
         onView={onViewChange}
      />
      <CalendarModalEvent/>
      <FabAddNew/>
    </div>
  )
}
