<script setup lang="ts">
import CarouselSlide from './CarouselSlide.vue'
import CarouselNavigation from './CarouselNavigation.vue'
import CarouselPagination from './CarouselPagination.vue'
import { computed, ref } from 'vue'

const props = defineProps({
  carouselSlides: {
    type: Array,
    required: true,
  },
})

const slidesCount = computed(() => props.carouselSlides.length)

const currentSlide = ref(1)

const nextSlide = () => {
  if (currentSlide.value === slidesCount.value) {
    currentSlide.value = 1
    return;
  }
  currentSlide.value += 1
}

const prevSlide = () => {
  if (currentSlide.value === 1) {
    currentSlide.value = 1
    return;
  }
  currentSlide.value -= 1
}
</script>

<template>
  <div class="card p-0">
    <carousel-slide v-for="(slide, index) in (carouselSlides as string[])" :key="slide ">
      <div v-show="currentSlide === index + 1" >
        <img :src="slide" class="img-fluid" />
      </div>
    </carousel-slide>

    <div class="card-body p-4">
      <carousel-navigation
        :currentSlide="currentSlide"
        :slidesCount="slidesCount"
        @next="nextSlide"
        @prev="prevSlide"
      >
        <carousel-pagination
          :images="carouselSlides"
          :currentSlide="currentSlide"
          :slidesCount="slidesCount"
        />
      </carousel-navigation>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  padding: 0;
  border: none;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 1rem 3rem #0000002d;
}
</style>
