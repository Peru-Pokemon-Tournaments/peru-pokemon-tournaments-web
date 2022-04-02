<template>
  <main>
    <slot name="navbar"></slot>
    <slot></slot>
    <slot name="footer"></slot>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({});
</script>

<style lang="scss" scoped>
main {
  width: 100%;
  min-height: 100vh;
  overflow-y: auto;
}
</style>
