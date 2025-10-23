<template>
  <div class="bg-gradient-to-br from-rose-50 via-white to-pink-100 min-h-screen py-10 px-6 font-sans">
    <!-- Header -->
    <h1
      class="text-4xl md:text-5xl font-extrabold mb-12 text-center text-pink-700 tracking-wide drop-shadow-sm"
    >
      ✨ Featured Products ✨
    </h1>

    <!-- Products Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
      <div
        v-for="product in products"
        :key="product.id"
        class="bg-white rounded-3xl shadow-md overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
      >
        <!-- Product Image -->
        <img
          :src="product.image"
          :alt="product.name"
          class="w-full h-56 object-cover"
        />

        <!-- Product Info -->
        <div class="p-6 flex flex-col justify-between h-full">
          <div>
            <h2 class="text-2xl font-semibold mb-2 text-gray-800 line-clamp-1">
              {{ product.name }}
            </h2>
            <p class="text-gray-600 mb-3 text-sm line-clamp-2">
              {{ product.description }}
            </p>
          </div>

          <!-- Price + Button -->
          <div class="flex items-center justify-between mt-4">
            <p class="text-pink-600 font-bold text-lg">
              ${{ product.price.toFixed(2) }}
            </p>
            <button
              class="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-xl hover:from-pink-600 hover:to-rose-600 shadow-md hover:shadow-lg active:scale-95 transition-all duration-300"
            >
              🛍️ Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="text-center mt-16 text-gray-500 text-sm">
      © 2025 LovelyShop | Crafted with ❤️ using Vue + Tailwind
    </footer>
  </div>
</template>

<script setup>
const products = [
  {
    id: 1,
    name: "Rose Face Cream",
    description: "Hydrating and soothing formula for glowing skin.",
    price: 524.99,
    image: "https://i.pinimg.com/736x/e2/a3/c2/e2a3c2dde9d41e893308b9b843783dc0.jpg",
  },
  {
    id: 2,
    name: "iPad Pro 11 inch",
    description: "Powerful performance for creative professionals.",
    price: 1014.99,
    image: "https://i.pinimg.com/1200x/51/1b/65/511b65726dd575cf495889e6ec839e3d.jpg",
  },
  {
    id: 3,
    name: "iPhone 15 Pro Max",
    description: "Next-level camera system and Titanium build.",
    price: 799.99,
    image: "https://i.pinimg.com/1200x/31/22/53/31225347a78bf173cac7f8ceca2f22db.jpg",
  },
  {
    id: 4,
    name: "Night Glow Serum",
    description: "Brightens and revitalizes skin overnight.",
    price: 324.99,
    image: "https://i.pinimg.com/1200x/83/9c/45/839c4537fd1464bc234d46bc3f2eb530.jpg",
  },
  {
    id: 5,
    name: "MacBook Air M3",
    description: "Lightweight and powerful for all-day productivity.",
    price: 1499.99,
    image: "https://i.pinimg.com/736x/a2/8a/3f/a28a3f481f7d4b415fc925a39443d81e.jpg",
  },
  {
    id: 6,
    name: "Apple Watch Ultra 2",
    description: "Adventure-ready smartwatch with advanced features.",
    price: 899.99,
    image: "https://i.pinimg.com/736x/7d/17/88/7d1788bdb070b9813fc5ab531a634618.jpg",
  },
];
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap");

body {
  font-family: "Poppins", sans-serif;
}

/* optional: for text truncation */
.line-clamp-1 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
