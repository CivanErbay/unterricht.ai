<template>
  <nav class="bg-white sticky top-0 inset-x-0 border-b-2 z-[999]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-24">
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center">
          <img class="h-full w-auto" src="/public/img/logo.png" alt="Logo" />
        </div>

        <!-- Navbar links -->
        <div class="hidden sm:block sm:ml-6">
          <div class="flex space-x-4 items-center h-full gap-8 text-black">
            <NuxtLink
              to="/"
              exact
              class="hover:bg-gray-700 hover:text-white px-3 py-2 rounded-full font-medium"
              active-class="bg-gray-900 text-white"
            >
              Home
            </NuxtLink>
            <NuxtLink
              to="/about"
              exact
              class="hover:bg-gray-700 hover:text-white px-3 py-2 rounded-full font-medium"
              active-class="bg-gray-900 text-white"
            >
              About
            </NuxtLink>
            <NuxtLink
              to="/contact"
              exact
              class="hover:bg-gray-700 hover:text-white px-3 py-2 rounded-full font-medium"
              active-class="bg-gray-900 text-white"
            >
              Contact
            </NuxtLink>
            <NuxtLink
              to="/subscribe"
              exact
              class="border-2 border-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-full font-bold"
              active-class="bg-gray-900 text-white"
            >
              Try for Free
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup></script>

<style lang="scss" scoped></style>
