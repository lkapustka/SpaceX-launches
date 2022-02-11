<script setup lang="ts">
import { computed } from 'vue'
import { useLaunches } from '../composables/useLaunches'
import { useRockects } from '../composables/useRockets'
import { useLaunchpads } from '../composables/useLaunchpads'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const { getLaunchById, data: launch, formatDate } = useLaunches()
const { getRocketById, rocketName, rocketImages } = useRockects()
const { getLaunchpadById, launchpadName, launchpadLocality } = useLaunchpads()

await getLaunchById(props.id)
await getRocketById(launch.value.rocket)
await getLaunchpadById(launch.value.launchpad)

const images = computed(() => [...launch.value.links.flickr.original, ...rocketImages.value])
</script>

<template>
  <div>
    <button>Back home</button>
    <p>Szczegóły lotu # {{ launch.flight_number }}</p>
  </div>

  <div>
    <p>Lot: {{ launch.name }}</p>
    <p>Data lotu: {{ formatDate(launch.date_local) }}</p>
    <p>Status: {{ launch.success }}</p>
  </div>

  <div>
    <p>Załoga: {{ launch.crew.length }}</p>
    <p>Rakieta: {{ rocketName }}</p>
    <p>Start: {{ launchpadName + ' ' + launchpadLocality }}</p>
  </div>

  <div v-for="image in images">
     <img :src="image" />
  </div>

  <div>
    <p>{{ launch.details }}</p>
  </div>
</template>
