import { computed } from 'vue'
import { useAxios } from './useAxios'

export const useLaunches = () => {
  const { getData, data } = useAxios()

  const getLaunches = async () => await getData('launches')

  const getLaunchById = async (id: string) => await getData(`launches/${id}`)

  const sortLaunchesByNewest = () => {
    data.value.sort((first: any, second: any) => second.date_unix - first.date_unix)
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-CA')
  }

  return {
    data: computed(() => data.value),
    getLaunches,
    getLaunchById,
    formatDate,
    sortLaunchesByNewest,
  }
}
