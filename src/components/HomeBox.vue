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
  <div class="col-12">
    <div class="card flex-md-row">

      <div class="col-md-6">
        <div class="h-100 d-md-block text-center bg-color" :class="{ 'd-none': !imgSource }">
          <img class="img-fluid" :src="imgSource" />
        </div>
      </div>

      <div class="col-md-6">
        <div class="card-body p-md-4">
          <p class="mb-1"># {{ flightNumber }}</p>
          <p class="mb-1 fs-5 fw-bold">{{ name }}</p>
          <p class="mb-5">{{ date }}</p>
          <router-link :to="{ name: 'detail', params: { id } }" class="btn btn-outline">
            Więcej &gt
          </router-link>
        </div>
      </div>

    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  padding: 0;
  margin-bottom: 1.5rem;
  border: none;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 0.5rem 1rem #00000026;
}

.bg-color {
  background-color: #f4f2f2;
}

.btn {
  border-color: #30c2d5;
  color: #30c2d5;
  max-width: 150px;
}
</style>
