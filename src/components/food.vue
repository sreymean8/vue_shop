<template>
  <div class="max-w-6xl mx-auto p-4">
    <h1 class="text-3xl font-extrabold text-gray-800 mb-6">All Products Food</h1>

    <!-- Filters Section -->
    <div class="flex flex-wrap items-center gap-2 mb-8 p-4 bg-white shadow-md rounded-xl">
      <span class="text-sm font-semibold text-gray-600 mr-2">Filters:</span>

      <!-- Category Filter -->
      <select
        v-model="selectedCategory"
        class="px-4 py-2 bg-green-700 text-white text-sm font-semibold rounded-lg shadow-inner cursor-pointer hover:bg-green-600 transition"
      >
        <option value="All">All Categories</option>
        <option value="Produce">Produce</option>
        <option value="Snacks">Snacks</option>
        <option value="Pantry">Pantry</option>
      </select>

      <!-- Price Filter -->
      <select
        v-model="priceRange"
        class="px-4 py-2 bg-white text-gray-700 text-sm border border-gray-300 rounded-lg shadow-sm cursor-pointer hover:border-green-500 transition"
      >
        <option value="All">Price</option>
        <option value="low">Under $5</option>
        <option value="medium">$5 - $20</option>
        <option value="high">Over $20</option>
      </select>

      <!-- Sort By -->
      <select
        v-model="sortBy"
        class="ml-auto px-4 py-2 bg-white text-gray-700 text-sm border border-gray-300 rounded-lg shadow-sm cursor-pointer hover:border-green-500 transition"
      >
        <option value="name">Sort by Name</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
      </select>
    </div>

    <!-- Product Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-if="filteredProducts.length === 0"
        class="lg:col-span-4 text-center py-10 text-gray-500"
      >
        No products match your current filters.
      </div>

      <!-- Product Card -->
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden flex flex-col"
      >
        <!-- Image Section -->
        <div class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
          <img :src="product.imageUrl" :alt="product.name" class="object-cover h-full w-full" />
          <span
            v-if="product.badge"
            :class="[
              'absolute top-2 left-2 px-3 py-1 text-xs font-bold text-white rounded-full shadow-md',
              getBadgeClass(product.badge),
            ]"
          >
            {{ product.badge }}
          </span>
          <span
            v-if="product.discount"
            class="absolute top-2 right-2 px-3 py-1 text-xs font-bold bg-orange-500 text-white rounded-full shadow-md"
          >
            {{ product.discount }}% OFF
          </span>
        </div>

        <!-- Details Section -->
        <div class="p-4 flex flex-col justify-between flex-grow">
          <div>
            <h3 class="font-semibold text-gray-800 h-12">{{ product.name }}</h3>
            <p class="text-xs text-gray-500 mb-3">
              {{ product.category }} - ({{ product.rating }}/5)
            </p>
          </div>

          <div class="flex justify-between items-center pt-3 border-t border-gray-100">
            <span class="text-xl font-extrabold text-green-700">
              ${{ product.price.toFixed(2) }}
            </span>
            <div class="flex gap-2">
              <!-- Add to Cart Button -->
              <button
                class="bg-green-600 text-white p-2 rounded-full hover:bg-green-500 transition transform hover:scale-105 active:scale-95 shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"
                  />
                </svg>
              </button>

              <!-- See More Button -->
              <button
                @click="openProduct(product)"
                class="text-sm font-medium text-green-700 hover:text-green-500 underline"
              >
                See More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for Product Details -->
    <div
      v-if="selectedProduct"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative">
        <button
          @click="selectedProduct = null"
          class="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <img
          :src="selectedProduct.imageUrl"
          :alt="selectedProduct.name"
          class="w-full h-56 object-cover rounded-lg mb-4"
        />

        <h2 class="text-2xl font-bold text-gray-800 mb-2">
          {{ selectedProduct.name }}
        </h2>
        <p class="text-gray-500 text-sm mb-3">
          Category: {{ selectedProduct.category }} | Rating: {{ selectedProduct.rating }}/5
        </p>

        <p class="text-lg text-green-700 font-semibold mb-4">
          Price: ${{ selectedProduct.price.toFixed(2) }}
        </p>

        <p class="text-gray-600 mb-4">
          This is a premium-quality product selected just for you! Add it to your cart now or
          continue exploring similar items.
        </p>

        <button
          class="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-500 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// State
const selectedCategory = ref('All')
const priceRange = ref('All')
const sortBy = ref('name')
const selectedProduct = ref(null)

// Product Data
const products = ref([
  { id: 1, name: 'Organic Green Big Sweet Pepper Seeds - Capsicum', category: 'Produce', price: 4.0, rating: 4.8, badge: 'Best Sale', imageUrl: 'https://i.etsystatic.com/19727526/r/il/e696e0/4673417024/il_fullxfull.4673417024_pa73.jpg' },
  { id: 2, name: 'Seoul Yopokki Spicy 4 flavors of Korean Topokki', category: 'Snacks', price: 0.9, rating: 4.6, badge: 'Hot', imageUrl: 'https://www.ubuy.com.lb/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvODFMMzNjVDJ4aUwuX1NMMTUwMF8uanBn.jpg' },
  { id: 3, name: 'The banana cavendish fruit is very popular in Malaysia', category: 'Produce', price: 0.9, rating: 4.8, imageUrl: 'https://southeastasiaglobe.com/wp-content/uploads/2017/11/bananas1.jpg' },
  { id: 4, name: 'Organic 100% Italian hass 100% natural Avocado', category: 'Produce', price: 10.1, rating: 4.8, discount: 20, imageUrl: 'https://organicandreal.com/cdn/shop/products/istockphoto-147442784-612x612_31bdd6b0-01b8-4f31-87a7-2e0230ada9cd_grande.jpg?v=1668333773' },
  { id: 5, name: 'Premium Jasmine Rice (5kg)', category: 'Pantry', price: 4.9, rating: 4.9, imageUrl: 'https://aeoncambodia.sgp1.digitaloceanspaces.com/image/catalog/product/8847101081680.jpg' },
  { id: 6, name: 'Gourmet Dark Chocolate Bar', category: 'Snacks', price: 8.5, rating: 4.5, badge: 'New', imageUrl: 'https://heartstringsdecor.com/cdn/shop/products/ScreenShot2021-01-08at9.55.27AM_1024x1024.png?v=1646342915' },
  { id: 7, name: 'OGoodness That Keeps on Growing.', category: 'Produce', price: 12.35, rating: 4.8, discount: 20, imageUrl: 'https://harvesthill.com/wp-content/uploads/2017/09/jj-fruitiful-product.jpg' },
  { id: 8, name: 'Rice (20kg)', category: 'Pantry', price: 20.0, rating: 4.9, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfoLAEyo96xUKGQWx04eaPxUWecXxJcmkzoWTSe6cLulZYp4NoXP9nMWsjt9eouvaXD7A&usqp=CAU' },
])

// Badge Color Logic
const getBadgeClass = (badge) => {
  switch (badge) {
    case 'Best Sale':
      return 'bg-red-600'
    case 'Hot':
      return 'bg-yellow-600'
    case 'New':
      return 'bg-blue-600'
    default:
      return 'bg-gray-600'
  }
}

// Computed Filtering + Sorting
const filteredProducts = computed(() => {
  let filtered = products.value

  if (selectedCategory.value !== 'All') {
    filtered = filtered.filter((p) => p.category === selectedCategory.value)
  }

  if (priceRange.value !== 'All') {
    filtered = filtered.filter((p) => {
      if (priceRange.value === 'low') return p.price < 5
      if (priceRange.value === 'medium') return p.price >= 5 && p.price <= 20
      if (priceRange.value === 'high') return p.price > 20
      return true
    })
  }

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy.value === 'name') return a.name.localeCompare(b.name)
    if (sortBy.value === 'price_asc') return a.price - b.price
    if (sortBy.value === 'price_desc') return b.price - a.price
    return 0
  })

  return sorted
})

// Show Modal with Product
const openProduct = (product) => {
  selectedProduct.value = product
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');
body {
  font-family: 'Inter', sans-serif;
  background-color: #f7f7f7;
}
</style>
