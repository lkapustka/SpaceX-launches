import { ref, computed } from 'vue'

export const useSearch = (rawData: any) => {
  const searchableData = ref<object[] | null>(null)

  const inProgress = computed(() => !!searchableData.value)

  const resetData = () => (searchableData.value = null)

  const findLaunchesByName = (searchedName: string, launches = rawData) => {
    const regex = new RegExp(searchedName, 'gi')
    return launches.filter((launch: any) => regex.test(launch.name))
  }

  const searchForLaunchesByName = (searchedName: string) => {
    if (inProgress.value && searchedName.length > 0) {
      searchableData.value = findLaunchesByName(searchedName, searchableData.value)
    }
    else if (searchedName.length > 0) {
      searchableData.value = findLaunchesByName(searchedName)
    }
  }

  const findSuccessfulLaunches = (launches = rawData) => {
    return launches.filter((launch: any) => launch.success === true)
  }

  const searchForSuccessfulLaunches = (isChecked: boolean) => {
    if (inProgress.value && isChecked) {
      searchableData.value = findSuccessfulLaunches(searchableData.value)
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
    return launches.filter((launch: any) => launch.date_unix >= from && launch.date_unix <= to)
  }

  const searchForLaunchesFromDatesRange = (dates: Date[]) => {
    const formatedDates = convertDatesToUnix(dates)

    if (inProgress.value && formatedDates) {
      searchableData.value = findLaunchesFromDatesRange(formatedDates, searchableData.value)
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
