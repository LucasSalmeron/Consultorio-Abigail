<script setup>
  import { useRouter, RouterView, RouterLink } from 'vue-router'
  import { ref } from 'vue';
  const router = useRouter();


</script>

<template>
  <nav class="nav-container">
      <!-- All users -->
      <RouterLink class="nav-element" to="/">Pacientes</RouterLink>

      <!-- Users -->
      <RouterLink  class="nav-element" to="/Tratamientos">Tratamientos</RouterLink>
      <RouterLink class="nav-element" to="/Pagos">Pagos</RouterLink>
  </nav>


  <main className="content-container">
    <RouterView />
  </main>
</template>
<style scoped>
.nav-container {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

.nav-element {
  float: left;
}

.nav-element{
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  cursor: pointer;
  font-size: 24px;
}

.nav-element:hover {
  background-color: #111;
}
.active{
  background-color: #05AA6D;
}

.content-container{
  display: flex;
  justify-content: left;
}


</style>



