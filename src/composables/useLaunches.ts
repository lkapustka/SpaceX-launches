import { computed } from 'vue'
import { useAxios } from './useAxios'

export const useLaunches = () => {
  const { get, getDataById, data } = useAxios()

  const getLaunches = async () => await get('launches')

  const getLaunchById = async (id: string) => {
    await getLaunches()
    getDataById(id)
  }

  const formatDate = (value: string) => {
    return new Date(value).toLocaleDateString('en-CA')
  }

  return {
    data: computed(() => data.value),
    getLaunches,
    getLaunchById,
    formatDate,
  }
}
