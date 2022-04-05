<template>
  <nav>
    <ul>
      <li id="main-li">
        <router-link to="/" id="main-logo">
          <img :src="logoImageAsset" alt="Logo" width="30" />
          <h1>Perú Pokémon Tournaments</h1>
        </router-link>
      </li>
      <li>
        <ul>
          <li v-if="!isLoggedIn">
            <router-link to="/login">Iniciar Sesión</router-link>
          </li>
          <span class="separator"></span>
          <li v-if="!isLoggedIn">
            <router-link to="/register">Registrarse</router-link>
          </li>
          <li v-if="isLoggedIn">
            <a href="/logout" @click.prevent="logout">Salir</a>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>
<script lang="ts">
import { useUserStore } from "@/stores/user";
import { mapActions, mapState } from "pinia";
import { defineComponent } from "vue";

export default defineComponent({
  computed: {
    ...mapState(useUserStore, ["isLoggedIn"]),
    logoImageAsset() {
      return require("@/assets/img/logo.png");
    },
  },
  methods: {
    ...mapActions(useUserStore, ["logout"]),
  },
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

  #main-li {
    margin-right: 1rem;
  }
}

.separator {
  width: 0.5rem;
}

img {
  display: inline;
}

h1 {
  font-size: 1rem;
  font-weight: bold;
}

a {
  color: $base-primary-navbar-font-color;
  text-decoration: none;

  &:hover {
    font-weight: bold;
  }
}

#main-logo {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
}
</style>
