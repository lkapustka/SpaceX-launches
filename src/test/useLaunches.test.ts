import { useLaunches } from '../composables/useLaunches'

describe('useLaunches', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('data initially should be equal to null', () => {
    const { data } = useLaunches()
    expect(data.value).toEqual(null)
  }),

  it('getLaunchById method push one object to data with "rocket" and "launchpad" properties', async () => {
    const { getLaunchById, data } = useLaunches()
    const testId = 'latest'
    await getLaunchById(testId)
    expect(data.value).toHaveProperty('rocket')
    expect(data.value).toHaveProperty('launchpad')
  }),

  it('should return date string in format YYYY-MM-DD', () => {
    const { formatDate } = useLaunches()
    const msPerSecond = 1000.0
    const dateUnix = (new Date('February 01, 2022').getTime() / msPerSecond).toString()
    expect(formatDate(dateUnix)).toEqual('2022-02-01')
  }),

  it('should sort launches inside data by newest', async () => {
    const { sortLaunchesByNewest, data, getLaunches } = useLaunches()
    await getLaunches()
    sortLaunchesByNewest()
    expect(data.value[0].date_unix).toBeGreaterThanOrEqual(data.value[1].date_unix)
    expect(data.value[1].date_unix).toBeGreaterThanOrEqual(data.value[2].date_unix)
    expect(data.value[2].date_unix).toBeGreaterThanOrEqual(data.value[3].date_unix)
    expect(data.value[3].date_unix).toBeGreaterThanOrEqual(data.value[4].date_unix)
  })
})
