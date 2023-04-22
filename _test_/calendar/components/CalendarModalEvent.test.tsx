import React from 'react'
import { render, screen } from '@testing-library/react'
// import { Provider } from 'react-redux'
// import { store } from '../../../src/store/store'
import { CalendarModalEvent } from '../../../src/calendar/components/CalendarModalEvent'
import { useCalendarStore } from '../../../src/hooks/useCalendarStore'
import { IBigCalendarEvent } from '../../../src/calendar/types/CalendarTypes'
import { useUIStore } from '../../../src/hooks/useUIStore'
import { WrapperProps } from '../../hooks/types'

// ! THIS TEST NOT WORKS

jest.mock('react-modal', () => ({
  ...jest.requireActual('react-modal'),
  setAppElement: jest.fn(),
  Modal: jest.fn(({ children }:WrapperProps) => <div>{children}</div>)
}))
// jest.mock('react-modal', () => ({
//   ...jest.requireActual('react-modal'),
//   setAppElement: jest.fn()
// }))
jest.mock('../../../src/hooks/useCalendarStore')
jest.mock('../../../src/hooks/useUIStore')
describe('testing in CalendarModalEvent', () => {
  test('should render the component', () => {
    (useCalendarStore as jest.Mock).mockReturnValue({ activeEvent: {} as IBigCalendarEvent, onSaveCalendarEvent: jest.fn(), onDeleteEventH: jest.fn() });
    (useUIStore as jest.Mock).mockReturnValue({ isDateModalOpen: true, onCloseDateModalH: jest.fn() })
    render(<CalendarModalEvent/>)
    screen.debug()
  })
})
