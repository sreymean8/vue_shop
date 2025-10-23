<template>
  <div class="max-w-6xl mx-auto p-4">
    <div class="flex justify-between items-center py-4 mb-6 bg-white shadow-lg rounded-xl px-6">
      
      <div class="relative cursor-pointer p-2 hover:bg-gray-100 rounded-full transition">
        <span v-if="cartCount > 0" class="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md transform translate-x-1/4 -translate-y-1/4">
          {{ cartCount }}
        </span>
      </div>
    </div>  
    <div class="flex flex-wrap items-center gap-2 mb-8 p-4 bg-white shadow-md rounded-xl">
      <span class="text-sm font-semibold text-gray-600 mr-2">Filters:</span>
      
      <select 
        v-model="selectedCategory"
        class="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg shadow-inner cursor-pointer hover:bg-indigo-500 transition"
      >
        <option value="All">All Categories</option>
        <option value="Produce">Produce</option>
        <option value="Snacks">Snacks</option>
        <option value="Pantry">Pantry</option>
      </select>
      
      <select 
        v-model="priceRange"
        class="px-4 py-2 bg-white text-gray-700 text-sm border border-gray-300 rounded-lg shadow-sm cursor-pointer hover:border-indigo-500 transition"
      >
        <option value="All">Price</option>
        <option value="low">Under $5</option>
        <option value="medium">$5 - $20</option>
        <option value="high">Over $20</option>
      </select>

      <select 
        v-model="sortBy"
        class="ml-auto px-4 py-2 bg-white text-gray-700 text-sm border border-gray-300 rounded-lg shadow-sm cursor-pointer hover:border-indigo-500 transition"
      >
        <option value="name">Sort by Name</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
      </select>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-if="filteredProducts.length === 0" class="lg:col-span-4 text-center py-10 text-gray-500">
        No products match your current filters.
      </div>
      
      <div 
        v-for="product in filteredProducts" 
        :key="product.id"
        class="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden group"
      >
        <div class="relative h-48 bg-gray-100 flex items-center justify-center overflow-hidden cursor-pointer"
             @click="openQuickView(product)">
          <img :src="product.imageUrl" :alt="product.name" class="object-cover h-full w-full group-hover:scale-105 transition duration-500" :onerror="`this.onerror=null;this.src='https://placehold.co/400x400/CCCCCC/333333?text=N%2FA';`" />
          
          <span 
            v-if="product.badge" 
            :class="[
              'absolute top-3 left-3 px-3 py-1 text-xs font-bold text-white rounded-full shadow-md', 
              getBadgeClass(product.badge)
            ]"
          >
            {{ product.badge }}
          </span>
          <span v-if="product.discount" class="absolute top-3 right-3 px-3 py-1 text-xs font-bold bg-pink-500 text-white rounded-full shadow-md">
            {{ product.discount }}% OFF
          </span>

        </div>

        <div class="p-4 flex flex-col justify-between h-40">
          <div class="mb-2">
            <h3 class="font-semibold text-gray-800 leading-tight h-10 overflow-hidden">{{ product.name }}</h3>
          </div>

          <div class="flex items-center justify-between mt-auto">
            
            <div class="flex flex-col">
              <span class="text-2xl font-extrabold text-gray-900">
                ${{ product.price.toFixed(2) }}
              </span>
              <p class="text-xs text-gray-500 mt-1">{{ product.category }}</p>
            </div>

            <div class="flex items-center space-x-2">
              <span class="text-sm font-semibold text-yellow-500">
                {{ '★'.repeat(Math.round(product.rating)) }}{{ '☆'.repeat(5 - Math.round(product.rating)) }}
              </span>
              
              <button 
                @click="addToCart(product)"
                class="bg-indigo-600 text-white p-3 rounded-full hover:bg-indigo-500 transition transform hover:scale-105 active:scale-95 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="hasMore" class="flex justify-center mt-10">
      <button 
        @click="loadMore"
        class="px-8 py-3 text-lg font-bold bg-indigo-500 text-white rounded-full shadow-lg hover:bg-indigo-600 transition transform hover:scale-[1.02] active:scale-95"
      >
        See More Products ({{ fullFilteredProducts.length - displayLimit }} left)
      </button>
    </div>

  </div>

  <transition name="modal">
    <div v-if="quickViewProduct" 
         class="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex items-center justify-center p-4"
         @click.self="closeQuickView">
      <transition name="modal-content">
        <div class="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto" @click.stop>      
          <button @click="closeQuickView" class="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition z-10 p-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div class="grid grid-cols-1 md:grid-cols-2">
            <div class="p-6 md:p-10 bg-gray-50 flex items-center justify-center rounded-l-xl">
              <img :src="quickViewProduct.imageUrl" :alt="quickViewProduct.name" class="w-full h-auto object-contain max-h-[70vh] rounded-lg shadow-md" :onerror="`this.onerror=null;this.src='https://placehold.co/600x600/CCCCCC/333333?text=N%2FA';`" />
            </div> 
            <div class="p-6 md:p-10 flex flex-col justify-between">
              <div>
                <h3 class="text-sm font-semibold text-indigo-600 mb-1">{{ quickViewProduct.category }}</h3>
                <h2 class="text-3xl font-extrabold text-gray-900 mb-4">{{ quickViewProduct.name }}</h2>
                
                <p class="text-lg font-bold text-gray-800 mb-6 flex items-center space-x-2">
                  <span>${{ quickViewProduct.price.toFixed(2) }}</span>
                  <span v-if="quickViewProduct.originalPrice" class="text-sm text-gray-500 line-through font-normal">${{ quickViewProduct.originalPrice.toFixed(2) }}</span>
                </p>

                <p class="text-gray-600 mb-8">
                  A delightful and essential item for your pantry. Sourced from the finest locations, this product ensures maximum quality and freshness. Perfect for everyday use or special recipes.
                </p>

                <div class="flex items-center space-x-2 mb-8">
                  <span class="text-xl font-bold text-yellow-500">
                    {{ '★'.repeat(Math.round(quickViewProduct.rating)) }}{{ '☆'.repeat(5 - Math.round(quickViewProduct.rating)) }}
                  </span>
                  <span class="text-sm text-gray-500">({{ quickViewProduct.rating }} out of 5)</span>
                </div>
              </div>

              <button 
                @click="addToCart(quickViewProduct); closeQuickView();"
                class="w-full py-3 bg-indigo-600 text-white font-semibold text-lg rounded-lg shadow-lg hover:bg-indigo-500 transition transform hover:scale-[1.01] active:scale-95 flex items-center justify-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
                </svg>
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
  <transition name="fade">
    <div v-if="confirmationMessage" class="fixed bottom-6 right-6 bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-2xl transition duration-300 transform ease-out z-50">
      {{ confirmationMessage }}
    </div>
  </transition>
</template>

<script setup>
import { ref, computed } from 'vue';

// 1. Reactive State for Filters and UI
const selectedCategory = ref('All');
const priceRange = ref('All');
const sortBy = ref('name');
const displayLimit = ref(8); 

// 2. Reactive State for Cart and Notifications
const cartItems = ref([]);
const confirmationMessage = ref('');
let messageTimeout = null;

// 3. Quick View Modal State
const quickViewProduct = ref(null);

// 4. Product Data 
const products = ref([
  { id: 1, name: 'Organic Green Big Sweet Pepper Seeds - Capsicum', category: 'Produce', price: 24.00, rating: 4.8, badge: 'Best Sale', imageUrl: 'https://i.pinimg.com/736x/9f/d9/e8/9fd9e828ac8f9aafd0da9446298d7625.jpg', originalPrice: null },
  { id: 2, name: 'Seoul Yopokki Spicy 4 flavors of Korean Topokki', category: 'Snacks', price: 0.90, rating: 4.6, badge: 'Hot', imageUrl: 'https://i.pinimg.com/1200x/71/84/1d/71841d1e8df59e9546eb68e9d727b34d.jpg', originalPrice: null },
  { id: 3, name: 'The banana cavendish fruit is very popular in Malaysia', category: 'Produce', price: 0.40, rating: 4.8, imageUrl: 'https://i.pinimg.com/736x/19/b4/55/19b4553fed30c874b693c2b8ce67131e.jpg', originalPrice: null },
  { id: 4, name: 'Organic 100% Italian hass 100% natural Avocado', category: 'Produce', price: 10.10, rating: 4.8, discount: 20, imageUrl: 'https://i.pinimg.com/1200x/89/01/3e/89013e11b39bf9be889da0497e56540b.jpg', originalPrice: 12.62 },
  { id: 5, name: 'Premium Jasmine Rice (5kg)', category: 'Pantry', price: 4.90, rating: 4.9, imageUrl: 'https://i.pinimg.com/736x/ad/19/b3/ad19b3582c56c054680743a8d18dedaf.jpg', originalPrice: null },
  { id: 6, name: 'Gourmet Dark Chocolate Bar', category: 'Snacks', price: 8.50, rating: 4.5, badge: 'New', imageUrl: 'https://i.pinimg.com/1200x/37/d7/fb/37d7fb118b18706076ec26b32c833ce4.jpg', originalPrice: null },
  { id: 7, name: 'OGoodness That Keeps on Growing.', category: 'Produce', price: 12.35, rating: 4.8, discount: 20, imageUrl: 'https://i.pinimg.com/1200x/b9/4a/0d/b94a0db0b6fceff37dc63e639623e4fc.jpg', originalPrice: 15.44 },
  { id: 8, name: 'Rice (20kg)', category: 'Pantry', price: 20.00, rating: 4.9, imageUrl: 'https://i.pinimg.com/1200x/e9/aa/6a/e9aa6a8b94690ad801e0ca00509ac98b.jpg', originalPrice: null },
  { id: 9, name: 'Gala Apples (Bag)', category: 'Produce', price: 3.99, rating: 4.7, imageUrl: 'https://i.pinimg.com/1200x/85/73/aa/8573aafc838248731b0b13e5cb6733d2.jpg', originalPrice: null },
  { id: 10, name: 'Organic Whole Milk (1L)', category: 'Pantry', price: 4.25, rating: 4.6, imageUrl: 'https://i.pinimg.com/1200x/7b/69/2b/7b692b6d703ddcfa8574ca29c83e5240.jpg', originalPrice: null },
  { id: 11, name: 'Heirloom Tomatoes', category: 'Produce', price: 6.50, rating: 4.9, imageUrl: 'https://i.pinimg.com/1200x/f0/ef/0b/f0ef0bba4496d1818e8b8fbe4ef524f1.jpg', originalPrice: null },
  { id: 12, name: 'Salty Pretzel Sticks', category: 'Snacks', price: 2.75, rating: 4.4, imageUrl: 'https://i.pinimg.com/736x/3b/5f/4f/3b5f4fb403a2d3b545f541e6aa385202.jpg', originalPrice: null },
  { id: 13, name: 'Organic Green Big Sweet Pepper Seeds - Capsicum', category: 'Produce', price: 24.00, rating: 4.8, badge: 'Best Sale', imageUrl: 'https://i.pinimg.com/1200x/b1/b4/7f/b1b47f33ed75383583951f65afa9d151.jpg', originalPrice: null },
  { id: 14, name: 'Seoul Yopokki Spicy 4 flavors of Korean Topokki', category: 'Snacks', price: 0.90, rating: 4.6, badge: 'Hot', imageUrl: 'https://i.pinimg.com/1200x/4f/42/d6/4f42d6053221ac57447be20bf687f3ad.jpg', originalPrice: null },
  { id: 15, name: 'The banana cavendish fruit is very popular in Malaysia', category: 'Produce', price: 0.40, rating: 4.8, imageUrl: 'https://i.pinimg.com/1200x/38/6c/9b/386c9bf1a363f16a9b468110e3b389a5.jpg', originalPrice: null },
  { id: 16, name: 'Organic 100% Italian hass 100% natural Avocado', category: 'Produce', price: 10.10, rating: 4.8, discount: 20, imageUrl: 'https://i.pinimg.com/1200x/8d/e8/ed/8de8edaddb874a984cc588312bb9f205.jpg', originalPrice: 12.62 },
  { id: 17, name: 'Premium Jasmine Rice (5kg)', category: 'Pantry', price: 4.90, rating: 4.9, imageUrl: 'https://i.pinimg.com/1200x/de/f0/25/def0257d686338e97935d5c2b4ce3d92.jpg', originalPrice: null },
    { id: 18, name: 'Premium Jasmine Rice (5kg)', category: 'Pantry', price: 4.90, rating: 4.9, imageUrl: 'https://i.pinimg.com/1200x/c7/1c/c6/c71cc633ed0fb8e6e0d70d6e8924b5bd.jpg', originalPrice: null },
  { id: 19, name: 'Premium Jasmine Rice (5kg)', category: 'Pantry', price: 4.90, rating: 4.9, imageUrl: 'https://i.pinimg.com/1200x/9d/ec/ce/9decce880479757417a75a23ecd40f02.jpg', originalPrice: null },
  { id: 20, name: 'Premium Jasmine Rice (5kg)', category: 'Pantry', price: 4.90, rating: 4.9, imageUrl: 'https://i.pinimg.com/1200x/a4/76/87/a47687aa71f5ceb3f5e5c81ffc5f3c79.jpg', originalPrice: null },
  { id: 21, name: 'Premium Jasmine Rice (5kg)', category: 'Pantry', price: 4.90, rating: 4.9, imageUrl: 'https://i.pinimg.com/736x/da/38/73/da38730443954ff40ca632be7854c57f.jpg', originalPrice: null },
  { id: 22, name: 'Premium Jasmine Rice (5kg)', category: 'Pantry', price: 4.90, rating: 4.9, imageUrl: 'https://i.pinimg.com/1200x/f4/11/d8/f411d89aef4d0cead9197afaa89897dc.jpg', originalPrice: null },
  { id: 23, name: 'Premium Jasmine Rice (5kg)', category: 'Pantry', price: 4.90, rating: 4.9, imageUrl: 'https://i.pinimg.com/736x/f4/d8/28/f4d828cede1ac00a2c749c1909353013.jpg', originalPrice: null },
    { id: 24, name: 'Premium Jasmine Rice (5kg)', category: 'Pantry', price: 4.90, rating: 4.9, imageUrl: 'https://i.pinimg.com/736x/3f/07/38/3f073896809c7734d5ff9e3d7c75be3b.jpg', originalPrice: null },
    { id: 20, name: 'Premium Jasmine Rice (5kg)', category: 'Pantry', price: 4.90, rating: 4.9, imageUrl: 'https://i.pinimg.com/1200x/a4/76/87/a47687aa71f5ceb3f5e5c81ffc5f3c79.jpg', originalPrice: null },
  { id: 21, name: 'Premium Jasmine Rice (5kg)', category: 'Pantry', price: 4.90, rating: 4.9, imageUrl: 'https://i.pinimg.com/736x/de/68/02/de6802428d65bfef03eba141e594eb3d.jpg', originalPrice: null },
  { id: 22, name: 'Premium Jasmine Rice (5kg)', category: 'Pantry', price: 4.90, rating: 4.9, imageUrl: 'https://i.pinimg.com/1200x/97/04/45/970445c7314745891663ea7415e299f8.jpg', originalPrice: null },
  { id: 23, name: 'Premium Jasmine Rice (5kg)', category: 'Pantry', price: 4.90, rating: 4.9, imageUrl: 'https://i.pinimg.com/736x/ac/e4/76/ace476d5870a84302618e435910cd8e0.jpg', originalPrice: null },
  { id: 24, name: 'Premium Jasmine Rice (5kg)', category: 'Pantry', price: 4.90, rating: 4.9, imageUrl: 'https://i.pinimg.com/1200x/28/c7/d7/28c7d75598f1173c6b46a6cc34813e1f.jpg', originalPrice: null },
    { id: 20, name: 'Premium Jasmine Rice (5kg)', category: 'Pantry', price: 4.90, rating: 4.9, imageUrl: 'https://i.pinimg.com/736x/26/01/2e/26012e5a3b1242be360efd6bb72f998f.jpg', originalPrice: null },
      { id: 24, name: 'Premium Jasmine Rice (5kg)', category: 'Pantry', price: 4.90, rating: 4.9, imageUrl: 'https://i.pinimg.com/1200x/58/d6/05/58d605c0fdb43d3336a04d423a7cd0f0.jpg', originalPrice: null },
    { id: 24, name: 'Premium Jasmine Rice (5kg)', category: 'Pantry', price: 4.90, rating: 4.9, imageUrl: 'https://i.pinimg.com/1200x/5f/b8/e2/5fb8e2b7efa9ac930a123cb103a8d082.jpg', originalPrice: null },

    { id: 21, name: 'Premium Jasmine Rice (5kg)', category: 'Pantry', price: 4.90, rating: 4.9, imageUrl: 'https://i.pinimg.com/1200x/ee/53/b1/ee53b1ab3a19f347b6a3dc447fb82212.jpg', originalPrice: null },
    { id: 22, name: 'Premium Jasmine Rice (5kg)', category: 'Pantry', price: 4.90, rating: 4.9, imageUrl: 'https://i.pinimg.com/1200x/3b/5f/3f/3b5f3f3e610f45c1609be4b1fb5ee727.jpg', originalPrice: null },
    { id: 23, name: 'Premium Jasmine Rice (5kg)', category: 'Pantry', price: 4.90, rating: 4.9, imageUrl: 'https://i.pinimg.com/1200x/fe/9a/99/fe9a99287f3a4e79455f15e01b725e40.jpg', originalPrice: null },
    { id: 24, name: 'Premium Jasmine Rice (5kg)', category: 'Pantry', price: 4.90, rating: 4.9, imageUrl: 'https://i.pinimg.com/1200x/32/5a/a5/325aa537aa0f22f5cd45132e9abd1bcd.jpg', originalPrice: null },

]);

// 5. Helper function for badge styling
const getBadgeClass = (badge) => {
  switch (badge) {
    case 'Best Sale': return 'bg-red-600';
    case 'Hot': return 'bg-yellow-600';
    case 'New': return 'bg-blue-600';
    default: return 'bg-gray-600';
  }
};

// 6. Product Filtering and Sorting (Full List)
const fullFilteredProducts = computed(() => {
  let filtered = products.value;

  // Filter by Category
  if (selectedCategory.value !== 'All') {
    filtered = filtered.filter(p => p.category === selectedCategory.value);
  }

  // Filter by Price Range
  if (priceRange.value !== 'All') {
    filtered = filtered.filter(p => {
      if (priceRange.value === 'low') return p.price < 5;
      if (priceRange.value === 'medium') return p.price >= 5 && p.price <= 20;
      if (priceRange.value === 'high') return p.price > 20;
      return true;
    });
  }

  // Sorting Logic
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy.value === 'name') return a.name.localeCompare(b.name);
    if (sortBy.value === 'price_asc') return a.price - b.price;
    if (sortBy.value === 'price_desc') return b.price - a.price;
    return 0;
  });
  
  return sorted;
});

// 7. Displayed Products (Sliced List for "See More")
const filteredProducts = computed(() => {
  // This is the list actually displayed in the grid, limited by displayLimit
  return fullFilteredProducts.value.slice(0, displayLimit.value);
});

// 8. Load More Logic
const hasMore = computed(() => {
  return displayLimit.value < fullFilteredProducts.value.length;
});

const loadMore = () => {
  displayLimit.value += 4; // Load 4 more items each time
};

// 9. Cart Logic
const cartCount = computed(() => cartItems.value.length); 

const addToCart = (product) => {
  // Check if the item is already in the cart. If so, increment quantity.
  const existingItem = cartItems.value.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    // For simplicity, we just add the unique product for now.
    cartItems.value.push({ ...product, quantity: 1 });
  }
  
  // Show confirmation message
  confirmationMessage.value = `${product.name} added to cart! (${cartCount.value} item types in cart)`;
  
  // Clear previous timeout and set a new one
  if (messageTimeout) {
    clearTimeout(messageTimeout);
  }
  messageTimeout = setTimeout(() => {
    confirmationMessage.value = '';
  }, 2500); // Hide after 2.5 seconds
};

// 10. Quick View Modal Methods
const openQuickView = (product) => {
  quickViewProduct.value = product;
  document.body.style.overflow = 'hidden'; // Prevent scrolling the main page
};

const closeQuickView = () => {
  quickViewProduct.value = null;
  document.body.style.overflow = ''; // Re-enable scrolling
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');
body {
  font-family: 'Inter', sans-serif;
  background-color: #f7f7f7; /* Light background */
}

/* Transition styles for the confirmation message */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Transition styles for the modal overlay */
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s;
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
}

/* Transition styles for the modal content */
.modal-content-enter-active, .modal-content-leave-active {
  transition: transform 0.3s ease-out, opacity 0.3s;
}
.modal-content-enter-from, .modal-content-leave-to {
  transform: scale(0.95);
  opacity: 0;
}
</style>