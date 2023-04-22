import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'
import { AppRouter } from '../../src/router/AppRouter'
import { useAuthStore } from '../../src/hooks/useAuthStore'
jest.mock('../../src/calendar/pages/CalendarPage', () => ({
  CalendarPage: jest.fn(() => <div>Calendar Page</div>)
}))

jest.mock('../../src/hooks/useAuthStore')
describe('testing in AppRouter', () => {
  const checkMock = jest.fn()
  beforeEach(() => jest.clearAllMocks())
  test('should return the loading scrren ', () => {
    (useAuthStore as jest.Mock).mockReturnValue({ status: 'checking', checkAuthToken: checkMock })
    const { getByText } = render(<AppRouter />)
    expect(getByText('Cargando...')).toBeTruthy()
    expect(checkMock).toHaveBeenCalledTimes(1)
  })
  test('should render the login page', () => {
    (useAuthStore as jest.Mock).mockReturnValue({ status: 'not-authenticated', checkAuthToken: checkMock })
    const { getByText, container } = render(<MemoryRouter>
        <AppRouter />
    </MemoryRouter>)
    expect(getByText('Inicia sesión')).toBeTruthy()
    expect(container).toMatchSnapshot()
  })
  test('should render the calendar page', () => {
    (useAuthStore as jest.Mock).mockReturnValue({ status: 'authenticated', checkAuthToken: checkMock })
    const { getByText } = render(<MemoryRouter>
        <AppRouter />
    </MemoryRouter>)
    expect(getByText('Calendar Page')).toBeTruthy()
  })
})
