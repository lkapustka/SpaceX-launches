<script setup lang="ts">
import { ref } from 'vue'
import Datepicker from 'vue3-date-time-picker'
import 'vue3-date-time-picker/dist/main.css'

const date = ref(new Date())

const format = (dates: Date[]): string => {
  const firstDate = dates[0].toLocaleDateString('en-CA')
    .split('-')
    .join('/')

  const secondDate = dates[1].toLocaleDateString('en-CA')
    .split('-')
    .join('/')

  return `${firstDate} - ${secondDate}`
}

const textInputOptions = ref({ format: 'yyyy/MM/dd - yyyy/MM/dd' })
</script>

<template>
  <label for="date-picker" class="form-label">Data lotu</label>
  <Datepicker
    v-model="date"
    range
    multi-calendars
    text-input
    hide-offset-dates
    hide-input-icon
    :enable-time-picker="false"
    :text-input-options="textInputOptions"
    :format="format"
    :preview-format="format"
    placeholder="RRRR/MM/DD - RRRR/MM/DD"
    input-class-name="form-control"
/>
</template>
