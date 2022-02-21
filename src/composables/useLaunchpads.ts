import { useAxios } from './useAxios'
import { computed } from 'vue'

interface ILaunchpad {
  name: string,
  locality: string,
}

export const useLaunchpads = () => {
  const { getData, data } = useAxios()

  const getLaunchpadById = async (id: string) => await getData(`launchpads/${id}`)

  const launchpadName = computed(() => (data.value as ILaunchpad).name)
  const launchpadLocality = computed(() => (data.value as ILaunchpad).locality)

  return {
    getLaunchpadById,
    launchpadName,
    launchpadLocality
  }
}
