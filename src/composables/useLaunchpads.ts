import { useAxios } from './useAxios'
import { computed } from 'vue'

export const useLaunchpads = () => {
  const { getData, data } = useAxios()

  const getLaunchpadById = async (id: string) => await getData(`launchpads/${id}`)

  const launchpadName = computed(() => data.value.name)
  const launchpadLocality = computed(() => data.value.locality)

  return {
    getLaunchpadById,
    launchpadName,
    launchpadLocality
  }
}
