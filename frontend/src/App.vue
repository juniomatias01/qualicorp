<script setup>
import { RouterLink, RouterView } from "vue-router";
import Logo from "@/components/Logo.vue";

</script>
<template>
  <header>
    <div>
      <Logo title="CRUD Customers" />
      <nav class="navbar navbar-inverse">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
            aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li><RouterLink :to="{ name: 'Home' }">Home</RouterLink></li>
            <li><RouterLink :to="{ name: 'Register' }">Register Custumer</RouterLink></li>
            <li><RouterLink :to="{ name: 'About' }">About</RouterLink></li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
  <RouterView />
</template>
<style>
@import "@/assets/base.css";
</style>

