<script setup lang="ts">
import { computed, ref } from 'vue'
import { useLaunches } from '../composables/useLaunches'
import { useSearch } from '../composables/useSearch'
import HomeBox from '../components/HomeBox.vue'
import HomeDatePicker from '../components/HomeDatePicker.vue'

 interface ILaunch {
    crew: string[],
    date_unix: number,
    details: string,
    flight_number: number
    id: string,
    launchpad: string,
    links: any,
    name: string,
    rocket: string,
    success: boolean
  }

const { data, getLaunches, formatDate, sortLaunchesByNewest } = useLaunches()
await getLaunches()
sortLaunchesByNewest()

const { searchResult, search } = useSearch(data.value as ILaunch[])
const launchesToDisplay = computed(() => filteredLaunches.value || rawLaunches.value)

const quantityToDisplay = ref(20)
const incrementBy20 = () => (quantityToDisplay.value = quantityToDisplay.value + 20)

const rawLaunches = computed(() => data.value?.slice(0, quantityToDisplay.value))
const filteredLaunches = computed(() => searchResult.value?.slice(0, quantityToDisplay.value))

const searchedName = ref('')
const isChecked = ref(false)
const dates = ref<Date[] | null>(null)
const getDates = (date: Date[]) => (dates.value = [date[0], date[1]])
</script>

<template>
  <form @submit.prevent class="pt-4">
    <div class="container horizontal-line">
      <div class="row">

        <div class="col-12 col-md-6 col-xl-3 mb-3">
          <label for="name" class="form-label">Nazwa lotu</label>
          <input
            type="text"
            id="name"
            class="form-control"
            placeholder="Wpisz nazwę"
            v-model="searchedName"
          />
        </div>

        <div class="col-12 col-md-6 col-xl-3 mb-3">
          <home-date-picker @submit-dates="getDates" />
        </div>

        <div class="col-12 col-md-6 col-xl-3 mb-3 align-self-md-center mb-xl-4 align-self-xl-end">
          <input
            type="checkbox"
            id="success-launches"
            class="form-check-input me-3"
            v-model="isChecked"
          />
          <label for="success-launches" class="form-check-label">Pokaż tylko udane loty</label>
        </div>

        <div class="col-12 col-md-6 col-xl-3 mb-3 align-self-xl-end">
          <button
            type="submit"
            class="w-100 btn btn-color"
            @click="search(searchedName, isChecked, dates as Date[])"
          >
            Szukaj
          </button>
        </div>

      </div>
    </div>
  </form>

  <div class="album py-4">
    <div class="container">

      <div class="row">
        <home-box
          v-for="launch in (launchesToDisplay as ILaunch[])"
          :key="launch.id"
          :id="launch.id"
          :flight-number="launch.flight_number"
          :name="launch.name"
          :date="formatDate(launch.date_unix)"
          :img-source="launch.links.flickr.original?.[0]"
        />
      </div>

      <div class="position-relative mb-4">
        <button class="btn position-absolute end-0" @click="incrementBy20()">
          Załaduj więcej &gt
        </button>
      </div>

    </div>
  </div>
</template>

<style lang="scss" scoped>
.horizontal-line::after {
  content: '';
  display: block;
  height: 1px;
  margin-top: 0.5rem;
  background-color: #c3c3c3;
}

.btn-color {
  background-color: #30c2d5;
  color: #ffffff;
}
</style>
