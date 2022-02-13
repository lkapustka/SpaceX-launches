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
  <div class="col-11 col-sm-12 mb-4 p-0 d-md-flex flex-row shadow overflow-hidden b-radius">
    <div class="d-md-block col-md-6 text-center bg-color" :class="{ 'd-none': !imgSource }">
      <img class="img-fluid" :src="imgSource" />
    </div>

    <div class="col-md-6 p-3 p-md-4 d-md-flex flex-column justify-content-center">
      <p class="mb-1"># {{ flightNumber }}</p>
      <p class="mb-1 fw-bold fs-5">{{ name }}</p>
      <p class="mb-5">{{ date }}</p>
      <router-link
        :to="{ name: 'detail', params: { id } }"
        role="button"
        class="btn btn-outline"
      >
        Więcej >
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.b-radius {
  border-radius: 10px;
}

.bg-color {
  background-color: #f4f2f2;
}

.btn {
 border-color: #30C2D5;
 color: #30C2D5;
 width: 150px;
}
</style>
