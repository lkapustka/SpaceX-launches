import { useAxios } from './useAxios'
import { computed } from 'vue'

export const useRockects = () => {
  const { get, getDataById, data } = useAxios()

  const getRockets = async () => await get('rockets')

  const getRocketById = async (id: string) => {
    await getRockets()
    getDataById(id)
  }

  const rocketName = computed(() => data.value.name)
  const rocketImages = computed(() => data.value.flickr_images)

  return {
    getRocketById,
    rocketName,
    rocketImages
  }
}
