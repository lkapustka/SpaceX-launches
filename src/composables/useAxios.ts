import axios from 'axios'
import { computed, ref } from 'vue'

export const useAxios = () => {
  const data = ref<any | null>(null)

  const getData = async (route: string) => {
    try {
      const response = await axios.get(`https://api.spacexdata.com/v4/${route}`)
      data.value = await response.data
    }
    catch (error: unknown) {
      console.log(error)
    }
  }

  return {
    data: computed(() => data.value),
    getData,
  }
}
