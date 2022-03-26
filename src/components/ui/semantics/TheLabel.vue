<template>
    <label>
        <slot></slot>
    </label>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
});
</script>
<style lang="scss" scoped>
label {
    display: block;
    height: fit-content;
    width: fit-content;
    margin: 0.2rem 0;
    font-size: 0.8rem;
}
</style>