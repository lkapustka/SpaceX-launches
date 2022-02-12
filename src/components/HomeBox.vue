<script setup lang="ts">
defineProps({
  id: {
    type: String,
    required: true,
  },

  flightNumber: {
    type: Number,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  date: {
    type: String,
    required: true,
  },

  imgSource: {
    type: String,
    default: undefined,
  },
})
</script>

<template>
  <div>
    <img :src="imgSource" />
  </div>
  <div>
    <p>Numer lotu: {{ flightNumber }}</p>
    <p>Nazwa lotu: {{ name }}</p>
    <p>Data: {{ date }}</p>
    <router-link :to="{ name: 'detail', params: { id } }">
      <button>więcej ></button>
    </router-link>
  </div>
</template>
