import { useAxios } from './useAxios'
import { computed } from 'vue'

export const useRockects = () => {
  const { getData, data } = useAxios()

  const getRocketById = async (id: string) => await getData(`rockets/${id}`)

  const rocketName = computed(() => data.value.name)
  const rocketImages = computed(() => data.value.flickr_images)

  return {
    getRocketById,
    rocketName,
    rocketImages
  }
}
