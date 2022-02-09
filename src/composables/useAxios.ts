import axios from 'axios'
import { computed, ref } from 'vue'

export const useAxios = () => {
  const data = ref()

  const get = async (route: string) => {
    try {
      const response = await axios.get(`https://api.spacexdata.com/v4/${route}`)
      data.value = await response.data
    }
    catch (error: unknown) {
      console.log(error)
    }
  }

  const getDataById = (id: string) => {
    data.value = data.value.find((object: any) => object.id === id)
  }

  return {
    data: computed(() => data.value),
    get,
    getDataById
  }
}
