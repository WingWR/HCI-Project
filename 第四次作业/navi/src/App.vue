<template>
  <UIBanner />
  <NaviMenu />
  <router-view />
</template>

<script setup>
import UIBanner from './components/UIBanner.vue'
import NaviMenu from './components/NaviMenu.vue';



</script>

<style>
html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  font-size: 0;

  overflow-x: hidden;
}
</style>