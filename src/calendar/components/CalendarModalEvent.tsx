import React, { useEffect, useMemo, useState } from 'react'
import Modal from 'react-modal'
import Swal from 'sweetalert2'
import { addHours, differenceInSeconds } from 'date-fns'
import es from 'date-fns/locale/es'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import 'sweetalert2/dist/sweetalert2.min.css'
import './CalendarModalEventCSS.css'
import { useUIStore } from '../../hooks/useUIStore'
import { useCalendarStore } from '../../hooks/useCalendarStore'

registerLocale('es', es)

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

Modal.setAppElement('#root')

export const CalendarModalEvent = () => {
  /* Hook that use store */
  const { activeEvent, onSaveCalendarEvent, onDeleteEventH } = useCalendarStore()
  const { isDateModalOpen, onCloseDateModalH } = useUIStore()
  /* States */
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formValues, setFormValues] = useState({
    title: '',
    notes: '',
    start: new Date(),
    end: addHours(new Date(), 2)
  })
  const { title, notes, start, end } = formValues

  /* Return the class according if the value is valiod or not */
  const titleClass = useMemo(() => {
    if (!formSubmitted) return ''
    return title.length > 0 ? '' : 'is-invalid'
  }, [title, formSubmitted])

  const hasID = useMemo(() => {
    return Object.keys(activeEvent).length > 0 && activeEvent.id !== undefined
  }, [activeEvent])

  const handleDeleteEvent = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo'
    }).then((result) => {
      if (result.isConfirmed) {
        onDeleteEventH(activeEvent)
        onCloseDateModalH()
      }
    })
  }

  /* Storage the active event values in the form */
  useEffect(() => {
    if (Object.keys(activeEvent).length > 0) {
      // setFormValues({ ...activeEvent })
      setFormValues(activeEvent)
    }
  }, [activeEvent])

  /* Storage values in form */
  const handleChange = ({
    target
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  }
  /* Storage date in form  */
  const onDateChange = (date: Date, changing: string) => {
    setFormValues({
      ...formValues,
      [changing]: date
    })
  }
  /* Submit function */
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormSubmitted(true)
    const difference = differenceInSeconds(end, start)
    if (isNaN(difference)) {
      Swal.fire(
        'Error',
        'La fecha de fin debe ser mayor a la de inicio',
        'error'
      )
      return null
    }
    if (title.length <= 0) {
      Swal.fire('Error', 'El título es necesario', 'error')
      return null
    }
    await onSaveCalendarEvent(formValues)
    onCloseDateModalH()
    setFormSubmitted(false)
  }
  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseDateModalH}
      style={customStyles}
      className="modal"
      overlayClassName={'modal-fondo'}
      closeTimeoutMS={200}
    >
      <h3 className="text-center"> Nuevo evento </h3>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <DatePicker
            className="form-control"
            selected={start}
            onChange={(e) => onDateChange(e!, 'start')}
            dateFormat="Pp"
            showTimeSelect
            locale={es}
            timeCaption="Hora"
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <DatePicker
            className="form-control"
            minDate={start}
            selected={end}
            onChange={(e) => onDateChange(e!, 'end')}
            dateFormat="Pp"
            showTimeSelect
            locale={es}
            timeCaption="Hora"
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={title}
            onChange={handleChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            className="form-control"
            placeholder="Notas"
            rows={5}
            name="notes"
            value={notes}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="d-flex justify-content-around">
          <button
            type="submit"
            className="btn btn-outline-primary btn-block mt-2"
          >
            <i className="far fa-save"/>
            <span> Guardar</span>
          </button>
          {hasID
            ? (
            <button
              type="button"
              className="btn btn-outline-danger btn-block mt-2"
              onClick={handleDeleteEvent}
            >
              <i className="fa-solid fa-trash"/>
              <span> Eliminar</span>
            </button>
              )
            : (
            <></>
              )}
        </div>
      </form>
    </Modal>
  )
}
