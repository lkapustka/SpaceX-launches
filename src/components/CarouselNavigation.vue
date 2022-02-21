<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

defineProps({
  currentSlide: {
    type: Number,
    required: true,
  },

  slidesCount: {
    type: Number,
    required: true,
  },
})

defineEmits(['prev', 'next'])
</script>

<template>
  <div class="d-flex justify-content-center">
    <button class="btn" @click="$emit('prev')">
      <font-awesome-icon
        :icon="['fas', 'chevron-left']"
        size="3x"
        color="#E3E1E1"
        aria-hidden="true"
      />
    </button>

    <p class="d-xl-none mb-0 mx-2 fs-5 align-self-center text-color">
      {{ currentSlide + '/' + slidesCount }}
    </p>
    <slot />

    <button class="btn" @click="$emit('next')">
      <font-awesome-icon
        :icon="['fas', 'chevron-right']"
        size="3x"
        color="#E3E1E1"
        aria-hidden="true"
      />
    </button>
  </div>
  <div class="d-none d-xl-block pt-4 text-center">
    <p class="mb-0 fs-5 text-color">{{ currentSlide + '/' + slidesCount }}</p>
  </div>
</template>

<style lang="scss" scoped>
.text-color {
  color: #bdbdbd;
}
</style>
