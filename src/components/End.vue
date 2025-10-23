<template>
  <footer class="mt-16 bg-gray-900 text-gray-300">
    <!-- Top Footer Section -->
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <!-- Section 1: Logo & Social -->
        <div class="flex flex-col space-y-4">
          <div class="flex items-center space-x-2 text-white text-xl font-bold">
            <svg
              viewBox="0 0 24 24"
              class="h-6 w-6 text-blue-400"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 
                   10-10S17.523 2 12 2zm-1 15h2v-6h-2v6zm1-8a1 1 
                   0 100-2 1 1 0 000 2z"
              />
            </svg>
            <span>dreamy.</span>
          </div>

          <div class="flex space-x-3 mt-4">
            <!-- Facebook -->
            <a href="#" class="text-gray-400 hover:text-white transition">
              <svg
                class="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 
                     2.761 2.239 5 5 5h14c2.762 0 
                     5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-3 
                     7h-2.5v-1.5c0-.827.673-1.5 
                     1.5-1.5h1v-2h-2c-2.761 0-5 
                     2.239-5 5v2h-2v3h2v7h3v-7h3l.5-3h-3.5v-2z"
                />
              </svg>
            </a>

            <!-- Instagram -->
            <a href="#" class="text-gray-400 hover:text-white transition">
              <svg
                class="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M22.258 7.218c.15.228.232.482.232.748 
                     0 .266-.082.52-.232.748l-1.46 
                     1.46c-.07.07-.17.1-.27.1-.11 
                     0-.21-.03-.28-.1l-1.46-1.46c-.15-.15-.23-.35-.23-.57 
                     0-.22.08-.42.23-.57l1.46-1.46c.15-.15.35-.23.57-.23s.42.08.57.23l1.46 
                     1.46zm-6.258 
                     1.432c-3.313 0-6 2.687-6 
                     6s2.687 6 6 6 6-2.687 6-6-2.687-6-6-6zm-4 
                     7c0 2.206 1.794 4 4 
                     4s4-1.794 4-4-1.794-4-4-4-4 
                     1.794-4 4zm11-12c0-.552-.448-1-1-1h-14c-.552 
                     0-1 .448-1 1v14c0 
                     .552.448 1 1 1h14c.552 0 
                     1-.448 1-1v-14z"
                />
              </svg>
            </a>

            <!-- Email -->
            <a href="#" class="text-gray-400 hover:text-white transition">
              <svg
                class="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M22 6.99v10.02c0 1.1-.9 2-2 
                     2H4c-1.1 0-2-.9-2-2V6.99c0-1.1.9-2 
                     2-2h16c1.1 0 2 .9 2 2zm-4.99 
                     4.19l-4.14 3.01c-.24.18-.55.27-.85.27s-.61-.09-.85-.27l-4.14-3.01c-.34-.24-.52-.66-.52-1.07 
                     0-.41.18-.83.52-1.07l4.14-3.01c.48-.35 
                     1.14-.35 1.62 0l4.14 3.01c.34.24.52.66.52 
                     1.07s-.18.83-.52 1.07z"
                />
              </svg>
            </a>
          </div>
        </div>

        <!-- Section 2: Contact Info -->
        <div>
          <h4 class="text-lg font-semibold text-white mb-3 uppercase">
            Contact Us
          </h4>
          <ul class="space-y-2 text-sm">
            <li>
              <a
                href="mailto:hello@dreamy.co"
                class="hover:text-white transition"
              >
                hello@dreamy.co
              </a>
            </li>
            <li>24 Atlantic Ave, Brooklyn, NY 11201</li>
            <li>+34 875 328 58 47</li>
          </ul>
        </div>

        <!-- Section 3: Subscribe -->
        <div>
          <h4 class="text-lg font-semibold text-white mb-3 uppercase">
            Subscribe
          </h4>
          <p class="text-sm mb-4">
            Enter your email to get notified about our new solutions
          </p>
          <div class="relative">
            <input
              type="email"
              placeholder="Email"
              class="w-full py-3 pl-4 pr-12 text-gray-800 bg-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-300"
            />
            <button
              class="absolute inset-y-0 right-0 flex items-center px-4 text-white bg-blue-500 hover:bg-blue-600 rounded-r-lg transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 5.26c.49.34 1.1.34 1.59 
                     0L21 8m-1 12H4a2 2 0 
                     01-2-2V6a2 2 0 012-2h16a2 2 
                     0 012 2v12a2 2 0 01-2 2z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div
        class="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500"
      >
        &copy; 2024 Dreamy Inc. All rights reserved
      </div>
    </div>

    <!-- Bottom Footer Section -->
    <div class="bg-white py-6 px-4 sm:px-6 lg:px-8">
      <div
        class="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-gray-700 text-sm"
      >
        <!-- Navigation Links -->
        <div
          class="flex flex-wrap justify-center space-x-6 uppercase font-medium"
        >
          <a href="#" class="hover:text-gray-900 transition mb-2 sm:mb-0"
            >Products</a
          >
          <a href="#" class="hover:text-gray-900 transition mb-2 sm:mb-0"
            >Blog</a
          >
          <a href="#" class="hover:text-gray-900 transition mb-2 sm:mb-0"
            >Shop</a
          >
          <a href="#" class="hover:text-gray-900 transition mb-2 sm:mb-0"
            >Contacts</a
          >
        </div>

        <!-- Center Logo/Icon -->
        <div class="my-4 sm:my-0 text-3xl text-blue-500">
          <svg
            viewBox="0 0 24 24"
            class="h-6 w-6 text-gray-400"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C6.477 2 2 6.477 2 
                 12s4.477 10 10 10 10-4.477 
                 10-10S17.523 2 12 2zm-1 
                 15h2v-6h-2v6zm1-8a1 1 
                 0 100-2 1 1 0 000 2z"
            />
          </svg>
        </div>

        <!-- Copyright -->
        <div>&copy; 2016 Dreamy Inc. All rights reserved</div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// No JavaScript logic needed for static footer
</script>
