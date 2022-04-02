<template>
  <input
    :type="type"
    :name="name"
    @input="changeModelValue"
    :value="modelValue"
  />
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  emits: ["update:modelValue"],
  props: {
    modelValue: {
      type: String as PropType<string>,
    },
    name: {
      type: String as PropType<string>,
    },
    type: {
      type: String as PropType<string>,
    },
  },
  methods: {
    changeModelValue(event: any): void {
      this.$emit("update:modelValue", event.target.value);
    },
  },
});
</script>

<style lang="scss" scoped>
input {
  padding: 0.3rem;
  margin: 0.3rem 0;
  box-shadow: $base-low-shadow;
  border: 1px solid $base-focus-color;
  width: 100%;

  &:focus {
    outline: none !important;
    border: 1px solid $base-focus-color-active;
    box-shadow: $base-low-shadow;
  }
}
</style>
