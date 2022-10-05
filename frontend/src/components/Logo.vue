<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="greetings">
    <h1 class="logo">{{ title }}</h1>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 350;
  font-size: 2.6rem;
  top: -10px;
  text-align: center;
}
</style>
