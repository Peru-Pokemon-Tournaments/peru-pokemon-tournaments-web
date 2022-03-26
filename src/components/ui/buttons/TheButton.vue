<template>
  <button>
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({});
</script>

<style lang="scss" scoped>
button {
  background-color: $base-primary-button-color;
  box-shadow: $base-low-shadow;
  padding: 0.5rem;
  margin: 0.1rem;
  border: 0;
  display: block;
  width: fit-content;
  height: fit-content;
  border-radius: 4px;

  &:hover {
    cursor: pointer;
  }
}
</style>
