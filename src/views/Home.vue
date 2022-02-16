<script setup lang="ts">
import { computed, ref } from 'vue'
import { useLaunches } from '../composables/useLaunches'
import HomeBox from '../components/HomeBox.vue'
import HomeDatePicker from '../components/HomeDatePicker.vue'

const { data, getLaunches, formatDate, sortLaunchesByNewest } = useLaunches()

await getLaunches()

sortLaunchesByNewest()

const quantity = ref(20)

const launches = computed(() => data.value.slice(0, quantity.value))

const incrementBy20 = () => quantity.value = quantity.value + 20



const getDate = (dates: Date[]) => {}

const search = () => {}

const launchName = ref()

const isChecked = ref(false)
</script>

<template>
  <form @submit.prevent class="pt-4">
    <div class="container horizontal-line">
      <div class="row">

        <div class="col-12 col-md-6 col-xl-3 mb-3">
          <label for="name" class="form-label">Nazwa lotu</label>
          <input type="text" id="name" class="form-control" placeholder="Wpisz nazwę" v-model="launchName"/>
        </div>

        <div class="col-12 col-md-6 col-xl-3 mb-3">
          <home-date-picker @submit-date="getDate"/>
        </div>

        <div class="col-12 col-md-6 col-xl-3 mb-3 align-self-md-center mb-xl-4 align-self-xl-end">
          <input type="checkbox" id="success-launches" class="form-check-input me-3" v-model="isChecked" />
          <label for="success-launches" class="form-check-label">Pokaż tylko udane loty</label>
        </div>

        <div class="col-12 col-md-6 col-xl-3 mb-3 align-self-xl-end">
          <button type="submit" class="w-100 btn btn-color" @click="search()">Szukaj</button>
        </div>

      </div>
    </div>
  </form>

  <div class="album py-4">
    <div class="container">

      <div class="row">
        <home-box
          v-for="launch in launches"
          :key="launch.id"
          :id="launch.id"
          :flight-number="launch.flight_number"
          :name="launch.name"
          :date="formatDate(launch.date_local)"
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
