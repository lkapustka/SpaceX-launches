import axios from 'axios'
import { computed, ref } from 'vue'

export const useAxios = () => {
  const data = ref<any | null>(null)
  const apiBaseUrl = ref('https://api.spacexdata.com/v4/')

  const getData = async (route: string) => {
    try {
      const response = await axios.get(`${apiBaseUrl.value}${route}`)
      data.value = await response.data
    }
    catch (error) {
      console.log(error)
    }
  }

  return {
    data: computed(() => data.value),
    apiBaseUrl: computed(() => apiBaseUrl.value),
    getData,

  }
}

