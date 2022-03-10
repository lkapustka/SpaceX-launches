import axios from 'axios'
import { useAxios } from '../composables/useAxios'

jest.mock('axios')
const mockAxiosGet = axios.get as jest.MockedFunction<typeof axios.get>

describe('useAxios', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('when API call is successful', () => {
    it('data initially should be equal to null', () => {
      const { data } = useAxios()
      expect(data.value).toEqual(null)
    }),

    it('getData method sets data ref', async () => {
      const { getData, data } = useAxios()
      const response = { data: 'Test' }
      mockAxiosGet.mockResolvedValue(response)
      await getData('test')
      expect(data.value).toEqual(response.data)
    }),

    it('axios.get inside getData method should be called the right amount of times', async () => {
      const { getData } = useAxios()
      await getData('test')
      expect(mockAxiosGet).toHaveBeenCalledTimes(1)
      await getData('test')
      expect(mockAxiosGet).toHaveBeenCalledTimes(2)
    }),

    it('axios.get inside getData method should be called with the right parameters', async () => {
      const { getData, apiBaseUrl } = useAxios()
      const route = 'test'
      await getData(route)
      expect(mockAxiosGet).toHaveBeenCalledWith(`${apiBaseUrl.value}${route}`)
    })
  })

  describe('when API call fails', () => {
    it('data should be equal to null', async () => {
      const { getData, data } = useAxios()
      const errorMessage = 'test/useAxios/errorMessage'
      mockAxiosGet.mockRejectedValue(new Error(errorMessage))
      await getData('test')
      expect(data.value).toEqual(null)
    })
  })
})
