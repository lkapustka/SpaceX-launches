import axios from 'axios'

export const useAxios = () => {
    const testAxios = async () => {
        return axios.get('https://api.spacexdata.com/v4/launches/latest')
    }

    return { testAxios }
}
