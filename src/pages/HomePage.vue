<template>
  <the-main-layout id="layout">
    <template v-slot:navbar>
      <the-navbar></the-navbar>
    </template>
    <the-tournaments></the-tournaments>
    <template v-slot:footer>
      <the-footer></the-footer>
    </template>
  </the-main-layout>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import TheMainLayout from "@/components/layouts/TheMainLayout.vue";
import TheFooter from "@/components/app/TheFooter.vue";
import TheNavbar from "@/components/app/TheNavbar.vue";
import TheTournaments from "@/components/app/TheTournaments.vue";

export default defineComponent({
  components: {
    TheMainLayout,
    TheFooter,
    TheNavbar,
    TheTournaments,
  },
});
</script>

<style lang="scss" scoped>
#layout {
  background-color: $base-secondary-background-color;
}
</style>
