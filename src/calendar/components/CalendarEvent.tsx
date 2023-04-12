import React from 'react'
import { ICalendarModalEvent } from '../types/CalendarTypes'

export const CalendarEvent = ({ event }: ICalendarModalEvent) => {
  const { title, user } = event
  return (
    <>
    <strong>{ title }</strong>
    <span> - { user?.name }</span>
</>
  )
}

/* All the props of calendar event */

/* {
    event: {
      title: 'My event',
      start: Date new Date('2023-04-04T23:20:11.000Z'),
      end: Date new Date('2023-04-05T01:20:11.000Z'),
      bgcolor: '#fafafa',
      notes: 'My event notes',
      user: { _id: '123', name: 'Antonio' }
    },
    continuesPrior: false,
    continuesAfter: false,
    title: 'My event',
    isAllDay: null,
    localizer: {
      formats: {
        dateFormat: 'dd',
        dayFormat: 'dd eee',
        weekdayFormat: 'cccc',
        timeGutterFormat: 'p',
        monthHeaderFormat: 'MMMM yyyy',
        dayHeaderFormat: 'cccc MMM dd',
        agendaDateFormat: 'ccc MMM dd',
        agendaTimeFormat: 'p'
      },
      segmentOffset: 0,
      messages: {
        date: 'Fecha',
        time: 'Hora',
        event: 'Evento',
        allDay: 'Todo el día',
        week: 'Semana',
        work_week: 'Work Week',
        day: 'Día',
        month: 'Mes',
        previous: '<',
        next: '>',
        yesterday: 'Yesterday',
        tomorrow: 'Tomorrow',
        today: 'Hoy',
        agenda: 'Agenda',
        noEventsInRange: 'No hay eventos en este rango'
      }
    },
    slotStart: Date new Date('2023-04-03T06:00:00.000Z'),
    slotEnd: Date new Date('2023-04-10T06:00:00.000Z')
  } */
