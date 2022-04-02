<template>
  <the-centered-layout id="layout">
    <base-card id="card">
      <template v-slot:header>
        <base-picture id="logo" :src="logoImageAsset" height="150" />
        <base-title> Registro </base-title>
      </template>
      <form @submit.prevent="submit">
        <base-label> Nombres </base-label>
        <base-input v-model="firstName" type="text" />
        <base-label> Apellidos </base-label>
        <base-input v-model="lastName" type="text" />
        <base-label> Nombre de usuario </base-label>
        <base-input v-model="username" type="text" />
        <base-label> Correo electrónico </base-label>
        <base-input v-model="email" type="email" />
        <base-label> Contraseña </base-label>
        <base-input v-model="password" type="password" />
        <base-label> Repetir contraseña </base-label>
        <base-input v-model="repeatedPassword" type="password" />
        <footer>
          <base-button> Enviar </base-button>
        </footer>
      </form>
    </base-card>
  </the-centered-layout>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { mapActions, mapState } from "pinia";
import { useUserStore } from "@/stores/user";
import BaseButton from "@/components/ui/buttons/BaseButton.vue";
import TheCenteredLayout from "@/components/layouts/TheCenteredLayout.vue";
import BaseCard from "@/components/ui/cards/BaseCard.vue";
import TheLabel from "@/components/ui/semantics/TheLabel.vue";
import BasePicture from "@/components/ui/images/BasePicture.vue";
import BaseInput from "@/components/ui/inputs/BaseInput.vue";
import BaseTitle from "@/components/ui/semantics/BaseTitle.vue";

export default defineComponent({
  components: {
    BaseButton,
    BaseCard,
    TheCenteredLayout,
    TheLabel,
    BasePicture,
    BaseInput,
    BaseTitle,
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      repeatedPassword: "",
    };
  },
  computed: {
    ...mapState(useUserStore, ["isRegisterUserSuccessfully"]),
    logoImageAsset() {
      return require("@/assets/img/logo.png");
    },
  },
  methods: {
    ...mapActions(useUserStore, ["registerUser"]),
    async submit(): Promise<void> {
      await this.registerUser({
        firstName: this.firstName,
        lastName: this.lastName,
        name: this.username,
        email: this.email,
        password: this.password,
        repeatedPassword: this.repeatedPassword,
      });
    },
    clearForm(): void {
      this.firstName = "";
      this.lastName = "";
      this.username = "";
      this.email = "";
      this.password = "";
      this.repeatedPassword = "";
    },
  },
  watch: {
    isRegisterUserSuccessfully() {
      this.clearForm();
    },
  },
});
</script>

<style lang="scss" scoped>
#layout {
  background-color: $base-secondary-background-color;
}

#card {
  width: 60%;
  min-width: 15rem;
  max-width: 25rem;
}

#logo {
  margin: 0 auto;
}

footer {
  display: flex;
  justify-content: center;
  margin-top: 0.8rem;
}
</style>
