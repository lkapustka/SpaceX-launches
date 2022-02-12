<script setup lang="ts"></script>

<template>
  <div id="app">
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
  </div>
</template>
