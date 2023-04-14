import { calendarAPI } from '../../src/api/calendarAPI'
describe('testing calendarAPi', () => {
  test('should contain the configuration by default', async () => {
    expect(calendarAPI.defaults.baseURL).toBe(process.env.VITE_API_URL)
  })
  test('should has x-token header in all the petitions', async () => {
    const token = '123456'
    localStorage.setItem('token', token)
    const res = await calendarAPI
      .get('/auth')
      .then((res) => res)
      .catch((res) => res)
    expect(res.config.headers['x-token']).toBe(token)
  })
})
