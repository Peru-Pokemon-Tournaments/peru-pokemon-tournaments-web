<template>
  <picture>
    <img :src="src" :alt="alt" :height="height" />
  </picture>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
export default defineComponent({
  props: {
    src: {
      type: String as PropType<string>,
      required: true,
    },
    alt: {
      type: String as PropType<string>,
      default: "Picture",
    },
    height: {
      type: String,
    },
  },
});
</script>
<style lang="scss" scoped>
picture {
  display: block;
  width: fit-content;
  height: fit-content;
}

img {
  max-width: 100%;
  max-height: 100%;
}
</style>
