<template>
  <div class="index">
    <navigation/>
    <h1>Home</h1>
    <p v-if="userLogged">User loggued: {{userLogged}}</p>
  </div>
</template>

<script>
import Navigation from "../components/Navigation";
export default {
  name: "Index",
  components: {
    navigation: Navigation
  },
  computed: {
  }
};
</script>

<style>
</style>