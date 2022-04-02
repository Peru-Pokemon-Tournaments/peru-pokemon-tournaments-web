<template>
  <div>
    <header v-if="this.$slots.header">
      <slot name="header"></slot>
    </header>
    <section>
      <slot></slot>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style lang="scss" scoped>
div {
  background-color: $base-primary-background-color;
  box-shadow: $base-low-shadow;
  padding: 1.2rem;
  margin: 1rem;
  width: fit-content;
  height: fit-content;
  overflow: hidden;

  header {
    margin-bottom: 1rem;
  }
}
</style>
