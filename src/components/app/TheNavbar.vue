<template>
  <nav>
    <ul>
      <li>
        <h1>Perú Pokémon Tournaments</h1>
      </li>
      <li>
        <ul>
          <li>
            <router-link to="/login">Iniciar Sesión</router-link>
          </li>
          <li>
            <router-link to="/register">Registrarse</router-link>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
});
</script>
<style lang="scss" scoped>
nav {
  box-shadow: $base-low-shadow;
}

ul {
  width: 100%;
  height: 3.5rem;
  padding: 0.5rem;
  background-color: $base-primary-navbar-color;
  color: $base-primary-navbar-font-color;
  display: flex;
  align-items: center;
  justify-content: space-between;

  li {
    margin-right: 1rem;
  }
}

h1 {
  font-size: 1rem;
  font-weight: bold;
}

a {
  color: $base-primary-navbar-font-color;
}
</style>
