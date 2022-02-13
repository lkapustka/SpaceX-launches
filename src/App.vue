<script setup lang="ts"></script>

<template>
  <router-view v-slot="{ Component }">
    <suspense>

      <template #default>
        <component :is="Component" />
      </template>

      <template #fallback>
        <h1>Loading...</h1>
      </template>

    </suspense>
  </router-view>
</template>

<style lang="scss">
html {
    scroll-behavior: smooth;
}

body {
    background-color: #F9F9F9;
}
</style>
