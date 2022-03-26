<template>
  <main>
    <slot></slot>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({});
</script>

<style lang="scss" scoped>
main {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  min-height: 100vh;
  overflow-y: auto;
}
</style>
