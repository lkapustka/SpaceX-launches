<script setup lang="ts">
defineProps({
  images: {
    type: Array,
    required: true,
  },

  currentSlide: {
    type: Number,
    required: true,
  },

  slidesCount: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <div class="container d-none d-xl-block">
    <div class="row flex-nowrap overflow-hidden" :class="[`row-cols-${slidesCount}`]">
      <div v-for="(img, index) in (images as string[])" :key="img" class="col d-flex">
        <div class="thumbnail" :class="{ 'active': index + 1 === currentSlide }">
          <img :src="img" class="img-fluid" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.thumbnail {
  border-radius: 2rem;
  overflow: hidden;
  align-self: center;
}

.active {
  border: 0.25rem solid #0202ee;
}
</style>
