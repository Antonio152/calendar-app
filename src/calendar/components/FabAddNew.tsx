import React from 'react'
import { useUIStore } from '../../hooks/useUIStore'
import { useCalendarStore } from '../../hooks/useCalendarStore'
import { addHours } from 'date-fns'

export const FabAddNew = () => {
  const { onOpenDateModalH } = useUIStore()
  const { onSetActiveNoteH } = useCalendarStore()

  const handleClickAdd = () => {
    onSetActiveNoteH({
      title: '',
      notes: '',
      start: new Date(),
      end: addHours(new Date(), 2)
    })
    onOpenDateModalH()
  }
  return (
    <button
        className='btn btn-primary fab'
        onClick={handleClickAdd}
    >
        <i className='fas fa-plus'/>
    </button>
  )
}
