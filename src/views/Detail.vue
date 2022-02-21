<script setup lang="ts">
import { computed } from 'vue'
import { useLaunches } from '../composables/useLaunches'
import { useRockets } from '../composables/useRockets'
import { useLaunchpads } from '../composables/useLaunchpads'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Carousel from '../components/Carousel.vue'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const { getLaunchById, data: launch, formatDate } = useLaunches()
const { getRocketById, rocketName, rocketImages } = useRockets()
const { getLaunchpadById, launchpadName, launchpadLocality } = useLaunchpads()

await getLaunchById(props.id)
await getRocketById(launch.value.rocket)
await getLaunchpadById(launch.value.launchpad)

const images = computed(() => [...launch.value.links.flickr.original, ...rocketImages.value])

const formatStatus = (status: string) => (status ? 'Udany' : 'Nie udany')
</script>

<template>
  <div class="container py-2">
    <div class="row">

      <div class="col-12 mt-2 mb-4">
        <div class="d-flex align-items-center border-b">
          <router-link to="/" class="btn px-4 py-2 my-3 border-e">
            <font-awesome-icon :icon="['fas', 'reply']" size="2x" color="#30c2d5" aria-hidden="true" />
          </router-link>
          <p class="mb-0 ps-4 fw-bold">Szczegóły lotu # {{ launch.flight_number }}</p>
        </div>
      </div>

      <div class="col-12 col-md-6 mb-4">
        <div class="card h-100">
          <p class="mb-1">Lot: <span class="fw-bold">{{ launch.name }}</span></p>
          <p class="mb-1">Data lotu: <span class="fw-bold">{{ formatDate(launch.date_unix) }}</span></p>
          <p class="mb-0">Status: <span class="fw-bold">{{ formatStatus(launch.success) }}</span></p>
        </div>
      </div>

      <div class="col-12 col-md-6 mb-4">
        <div class="card h-100">
          <p class="mb-1">Załoga: <span class="fw-bold">{{ launch.crew.length }}</span></p>
          <p class="mb-1">Rakieta: <span class="fw-bold">{{ rocketName }}</span></p>
          <p class="mb-0">Start: <span class="fw-bold">{{ launchpadName + ' ' + launchpadLocality }}</span></p>
        </div>
      </div>

      <div class="col-12 mb-4">
        <carousel :carousel-slides="images"/>
      </div>

      <div class="col-12 mb-4" v-if="launch.details">
        <div class="card">
          <p class="mx-1 my-2">{{ launch.details }}</p>
        </div>
      </div>

    </div>
  </div>
</template>

<style lang="scss" scoped>
.border-b {
  border-bottom: solid #c3c3c3;
  border-width: 1px;
}

.border-e {
  border-right: solid #c3c3c3;
  border-width: 1px;
}

.card {
  padding: 2rem;
  border: none;
  border-radius: 1rem;
  box-shadow: 0 1rem 3rem #0000002d;
}
</style>
