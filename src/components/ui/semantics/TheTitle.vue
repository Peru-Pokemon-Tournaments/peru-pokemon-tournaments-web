<template>
  <component :is="type">
    <slot></slot>
  </component>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    type: {
      type: String as PropType<string>,
      default: "h1",
      validator(val: string): boolean {
        return ["h1", "h2", "h3", "h4"].indexOf(val) !== -1;
      },
    },
  },
});
</script>

<style lang="scss" scoped>
h1 {
  font-size: 1.5rem;
}

h2 {
  font-size: 1.4rem;
}

h3 {
  font-size: 1.3rem;
}

h4 {
  font-size: 1.2rem;
}
</style>
