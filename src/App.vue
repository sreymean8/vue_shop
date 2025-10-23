<template>
  <div
   class="app">
    <Header />
    <Hero />
    <shopoutfit />
    <blockphone />
    <Food />
    <End />
  </div>
</template>
<script  setup>
import { ref } from 'vue';
import Header from './components/Header.vue';
import Hero from './components/Food.vue';
import shopoutfit from './components/shopoutfit.vue';
import blockphone from './components/blockphone.vue';
import End from './components/End.vue';
</script>
