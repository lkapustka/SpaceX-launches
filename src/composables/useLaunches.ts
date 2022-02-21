import { computed } from 'vue'
import { useAxios } from './useAxios'

interface ILaunch {
  crew: string[],
  date_unix: number,
  details: string,
  flight_number: number
  id: string,
  launchpad: string,
  links: any,
  name: string,
  rocket: string,
  success: boolean
}

export const useLaunches = () => {
  const { getData, data } = useAxios()

  const getLaunches = async () => await getData('launches')

  const getLaunchById = async (id: string) => await getData(`launches/${id}`)

  const sortLaunchesByNewest = () => {
    (data.value as ILaunch[]).sort((a, b) => b.date_unix - a.date_unix)
  }

  const formatDate = (unixTime: string) => {
    const msPerSecond = 1000.0
    return new Date(Number(unixTime) * msPerSecond).toLocaleDateString('en-CA')
  }

  return {
    data: computed(() => data.value),
    getLaunches,
    getLaunchById,
    formatDate,
    sortLaunchesByNewest,
  }
}
