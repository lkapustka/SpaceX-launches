import { useAxios } from './useAxios'
import { computed } from 'vue'

interface IRocket {
  name: string
  flickr_images: string[]
}

export const useRockets = () => {
  const { getData, data } = useAxios()

  const getRocketById = async (id: string) => await getData(`rockets/${id}`)

  const rocketName = computed(() => (data.value as IRocket).name)
  const rocketImages = computed(() => (data.value as IRocket).flickr_images)

  return {
    getRocketById,
    rocketName,
    rocketImages,
  }
}
