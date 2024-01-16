<template>
  <div
    class="text-black container mx-auto min-h-screen flex flex-col justify-center items-center"
  >
    <!-- Header Section -->
    <header class="text-center text-white">
      <h1 class="text-4xl font-bold mb-4">Hands on problem understanding</h1>
      <p class="text-lg mb-8">Revolutionizing Education with AI</p>
      <!-- <a href="#features" class="text-blue-500 hover:underline">Learn More</a> -->
    </header>

    <!-- Features Section -->
    <section id="features" class="py-16 w-full">
      <div class="w-full mx-auto text-center">
        <h2 class="text-5xl font-bold mb-8 text-white">Use Cases</h2>

        <div class="flex flex-col w-full gap-8 px-24">
          <!-- Feature 1 -->
          <div class="p-6 bg-white rounded-lg max-w-[400px] self-start">
            <i
              class="text-4xl text-blue-500 mb-4 fas fa-chalkboard-teacher"
            ></i>
            <h3 class="text-xl font-semibold mb-2">Smart Scheduling</h3>
            <p class="">
              Create optimized teacher schedules based on educational sciences
              context.
            </p>
          </div>

          <!-- Feature 2 -->
          <div class="p-6 bg-white rounded-lg max-w-[400px] self-center">
            <i class="text-4xl text-blue-500 mb-4 fas fa-rocket"></i>
            <h3 class="text-xl font-semibold mb-2">AI-Powered Efficiency</h3>
            <p class="">
              Boost efficiency and productivity with our AI-driven tools.
            </p>
          </div>

          <!-- Feature 3 -->
          <div class="p-6 bg-white rounded-lg max-w-[400px] self-end">
            <i class="text-4xl text-blue-500 mb-4 fas fa-lightbulb"></i>
            <h3 class="text-xl font-semibold mb-2">Innovative Solutions</h3>
            <p class="">
              Bring innovative solutions to the field of education.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- <div class="w-screen h-4 bg-white my-24 overflow-hidden"></div> -->

    <!-- CTA Section -->
    <section class="bg-blue-800 py-16 text-center p-6 rounded-md">
      <h2 class="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
      <p class="text-lg text-white mb-8">
        Join us in shaping the future of education!
      </p>
      <NuxtLink
        to="/demo"
        exact
        class="border-2 bg-white border-black hover:bg-blue-500 hover:text-white px-6 py-2 rounded-full font-bold"
        active-class="bg-gray-900 text-white"
      >
        Try for free
      </NuxtLink>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-16">
      <div class="container mx-auto text-center">
        <h2 class="text-3xl font-bold mb-8">Contact Us</h2>
        <p class="text-gray-300 mb-4">
          Have questions or want to learn more about Smarteach.ai? Get in touch
          with us!
        </p>
        <a href="mailto:info@smarteach.ai" class="text-blue-500 hover:underline"
          >info@smarteach.ai</a
        >
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'index',
};
</script>

<style scoped>
/* You can customize your styles further here */
</style>
