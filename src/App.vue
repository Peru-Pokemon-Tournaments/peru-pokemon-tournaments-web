<template>
  <router-view />
</template>

<script lang="ts">
import { mapActions } from "pinia";
import { defineComponent } from "vue-demi";
import { useUserStore } from "./stores/user";

export default defineComponent({
  methods: {
    ...mapActions(useUserStore, ["tryLogInFromCache"]),
  },
  mounted(): void {
    this.tryLogInFromCache();
  },
});
</script>

<style lang="scss">
@import "@/styles/_reset.scss";

* {
  box-sizing: border-box;
}

html,
body,
form,
fieldset,
table,
tr,
td,
img {
  font-family: "Roboto", Arial, Helvetica, sans-serif !important;
}

input,
button,
select,
textarea,
optgroup,
option {
  font-family: inherit;
  font-size: inherit;
  font-style: inherit;
  font-weight: inherit;
}

body {
  font-size: 0.875em;
  margin: 0;
}
</style>
