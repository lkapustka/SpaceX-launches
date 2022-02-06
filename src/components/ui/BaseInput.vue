<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    default: '',
  },

  modelValue: {
    type: [String, Number],
    default: '',
  },

  placeholder: {
    type: String,
    default: '',
  }
})
</script>

<template>
  <label>
    {{ label }}
    <input
      v-bind="$attrs"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </label>
</template>
