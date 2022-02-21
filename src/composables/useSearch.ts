import { ref, computed } from 'vue'

interface ILaunch {
  crew: string[],
  date_unix: number,
  details: string,
  flight_number: number
  id: string,
  launchpad: string,
  name: string,
  rocket: string,
  success: boolean
}

export const useSearch = (rawData: ILaunch[]) => {
  const searchableData = ref<ILaunch[] | null>(null)

  const inProgress = computed(() => !!searchableData.value)

  const resetData = () => (searchableData.value = null)

  const findLaunchesByName = (searchedName: string, launches = rawData) => {
    const regex = new RegExp(searchedName, 'gi')
    return launches.filter(launch => regex.test(launch.name))
  }

  const searchForLaunchesByName = (searchedName: string) => {
    if (inProgress.value && searchedName.length > 0) {
      searchableData.value = findLaunchesByName(searchedName, searchableData.value as ILaunch[])
    }
    else if (searchedName.length > 0) {
      searchableData.value = findLaunchesByName(searchedName)
    }
  }

  const findSuccessfulLaunches = (launches = rawData) => {
    return launches.filter(launch => launch.success === true)
  }

  const searchForSuccessfulLaunches = (isChecked: boolean) => {
    if (inProgress.value && isChecked) {
      searchableData.value = findSuccessfulLaunches(searchableData.value as ILaunch[])
    }
    else if (isChecked) {
      searchableData.value = findSuccessfulLaunches()
    }
  }

  const convertDatesToUnix = (dates: Date[]) => {
    if (dates && dates.length === 2) {
      const msPerSecond = 1000.0
      const firstDate = dates[0].getTime() / msPerSecond
      const secondDate = dates[1].getTime() / msPerSecond
      return [firstDate, secondDate]
    }
    else {
      return null
    }
  }

  const findLaunchesFromDatesRange = (unixDates: number[], launches = rawData) => {
    const [from, to] = unixDates
    return launches.filter(launch => launch.date_unix >= from && launch.date_unix <= to)
  }

  const searchForLaunchesFromDatesRange = (dates: Date[]) => {
    const formatedDates = convertDatesToUnix(dates)

    if (inProgress.value && formatedDates) {
      searchableData.value = findLaunchesFromDatesRange(formatedDates, searchableData.value as ILaunch[])
    }
    else if (formatedDates) {
      searchableData.value = findLaunchesFromDatesRange(formatedDates)
    }
  }

  const search = (searchedName: string, isChecked: boolean, dates: Date[]) => {
    resetData()

    searchForLaunchesFromDatesRange(dates)

    searchForLaunchesByName(searchedName)

    searchForSuccessfulLaunches(isChecked)
  }

  return {
    searchResult: computed(() => searchableData.value),
    search,
  }
}
