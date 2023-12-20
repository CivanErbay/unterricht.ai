<template>
  <div class="bg-gray-900 text-white min-h-screen flex flex-col justify-center items-center">
    <!-- Header Section -->
    <header class="text-center">
      <h1 class="text-4xl font-bold mb-4">Welcome to Smarteach.ai</h1>
      <p class="text-lg mb-8">Revolutionizing Education with AI</p>
      <a href="#features" class="text-blue-500 hover:underline">Learn More</a>
    </header>

    <!-- Features Section -->
    <section id="features" class="py-16">
      <div class="container mx-auto text-center">
        <h2 class="text-3xl font-bold mb-8">Our Features</h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="p-6 bg-gray-800 rounded-lg">
            <i class="text-4xl text-blue-500 mb-4 fas fa-chalkboard-teacher"></i>
            <h3 class="text-xl font-semibold mb-2">Smart Scheduling</h3>
            <p class="text-gray-300">Create optimized teacher schedules based on educational sciences context.</p>
          </div>

          <!-- Feature 2 -->
          <div class="p-6 bg-gray-800 rounded-lg">
            <i class="text-4xl text-blue-500 mb-4 fas fa-rocket"></i>
            <h3 class="text-xl font-semibold mb-2">AI-Powered Efficiency</h3>
            <p class="text-gray-300">Boost efficiency and productivity with our AI-driven tools.</p>
          </div>

          <!-- Feature 3 -->
          <div class="p-6 bg-gray-800 rounded-lg">
            <i class="text-4xl text-blue-500 mb-4 fas fa-lightbulb"></i>
            <h3 class="text-xl font-semibold mb-2">Innovative Solutions</h3>
            <p class="text-gray-300">Bring innovative solutions to the field of education.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-blue-500 py-16 text-center">
      <h2 class="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
      <p class="text-lg text-white mb-8">Join us in shaping the future of education!</p>
      <nuxt-link to="demo"
        class="bg-white text-blue-500 hover:bg-blue-700 text-lg font-semibold py-2 px-6 rounded-full">Try for free</nuxt-link>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-16">
      <div class="container mx-auto text-center">
        <h2 class="text-3xl font-bold mb-8">Contact Us</h2>
        <p class="text-gray-300 mb-4">Have questions or want to learn more about Smarteach.ai? Get in touch with us!</p>
        <a href="mailto:info@smarteach.ai" class="text-blue-500 hover:underline">info@smarteach.ai</a>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'index',
}
</script>

<style scoped>
/* You can customize your styles further here */
</style>
