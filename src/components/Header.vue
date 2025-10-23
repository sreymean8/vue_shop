<template>
  <header
    class="sticky top-0 z-50 bg-white shadow-sm transition-all duration-300"
  >
    <!-- Top Bar -->
    <div class="flex items-center justify-between px-6 py-3 lg:px-12">
      <!-- Logo -->
      <div class="flex items-center space-x-2">
        <img src="https://i.pinimg.com/736x/f7/fb/fa/f7fbfa64b6bf8be6db664775782ff45d.jpg" alt="ShopEase Logo" class="h-20 w-20" />
        <h1 class="text-2xl font-bold text-green-700">ShopEase</h1>
      </div>

      <!-- Search Bar -->
      <div class="flex-1 mx-6 max-w-xl relative hidden md:flex">
        <input
          type="text"
          placeholder="Search..."
          class="w-full border border-gray-300 rounded-full pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600"
        >
          <Icon icon="mdi:magnify" class="w-5 h-5" />
        </button>
      </div>

      <!-- Icons -->
      <div class="flex items-center space-x-6 text-gray-700">
        <button class="relative hover:text-green-600">
          <Icon icon="mdi:heart-outline" class="w-6 h-6" />
          <span
            class="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full px-1"
            >2</span
          >
        </button>

        <button class="relative hover:text-green-600">
          <Icon icon="mdi:cart-outline" class="w-6 h-6" />
          <span
            class="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full px-1"
            >3</span
          >
        </button>

        <button class="hover:text-green-600">
          <Icon icon="mdi:account-outline" class="w-6 h-6" />
        </button>

        <!-- Mobile Menu Toggle -->
        <button
          class="md:hidden text-gray-700 hover:text-green-600"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <Icon icon="mdi:menu" class="w-6 h-6" />
        </button>
      </div>
    </div>

    <!-- Navigation Bar -->
    <nav class="bg-green-950">
      <ul
        class="hidden md:flex justify-center gap-x-8 py-3 text-sm font-medium text-white"
      >
        <li v-for="item in navItems" :key="item.id">
          <a
            :href="item.link"
            class="hover:text-green-300 transition-colors duration-200"
          >
            {{ item.name }}
          </a>
        </li>
      </ul>

      <!-- Mobile Menu -->
      <div v-if="isMobileMenuOpen" class="md:hidden bg-green-900 text-white">
        <ul class="flex flex-col items-center py-3 space-y-2">
          <li v-for="item in navItems" :key="item.id">
            <a
              :href="item.link"
              class="hover:text-green-300 transition-colors duration-200"
              >{{ item.name }}</a
            >
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { Icon } from "@iconify/vue";

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

const navItems = [
  { id: 1, name: "Home", link: "../components/Hero.vue" },
  { id: 2, name: "Products", link: "#products" },
  { id: 3, name: "Categories", link: "#categories" },
  { id: 4, name: "Offers", link: "#offers" },
  { id: 5, name: "About", link: "#about" },
  { id: 6, name: "Contact", link: "#contact" },
];

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
