import axios from 'axios'
import { computed, ref } from 'vue'

export const useAxios = () => {
  const data = ref()

  const get = async (url: string) => {
    try {
      const response = await axios.get(url)
      data.value = await response.data
    }
		catch (error: unknown) {
      console.log(error)
    }
  }

  return {
    data: computed(() => data.value),
    get
  }
}
