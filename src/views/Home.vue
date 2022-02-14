<script setup lang="ts">
import HomeBox from '../components/HomeBox.vue'
import { useLaunches } from '../composables/useLaunches'

const { data: launches, getLaunches, formatDate } = useLaunches()

await getLaunches()

const showMore = () => {}
</script>

<template>
  <label for="name">Nazwa lotu</label>
  <input id="name" />

  <label for="date">Data lotu></label>
  <input type="date" id="date" />

  <input type="checkox" id="success-launches" />
  <label for="success-launches">Pokaż tylko udane loty</label>

  <button>Szukaj</button>

  <span></span>

  <div class="album py-5">
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
      <button @click="showMore">Załaduj więcej ></button>
    </div>
  </div>
</template>
