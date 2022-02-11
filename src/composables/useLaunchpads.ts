import { useAxios } from './useAxios'
import { computed } from 'vue'

export const useLaunchpads = () => {
  const { get, getDataById, data } = useAxios()

  const getLaunchpads = async () => await get('launchpads')

  const getLaunchpadById = async (id: string) => {
    await getLaunchpads()
    getDataById(id)
  }

  const launchpadName = computed(() => data.value.name)
  const launchpadLocality = computed(() => data.value.locality)

  return {
    getLaunchpadById,
    launchpadName,
    launchpadLocality
  }
}
