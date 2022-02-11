<script setup lang="ts">
defineProps({
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
    }
})

defineEmits(['click'])
</script>

<template>
<div>
    <img :src="imgSource">
</div>
<div>
    <p>Numer lotu: {{ flightNumber }}</p>
    <p>Nazwa lotu: {{ name }}</p>
    <p>Data: {{ date }}</p>
    <button @click="$emit('click')">więcej ></button>
</div>
</template>
