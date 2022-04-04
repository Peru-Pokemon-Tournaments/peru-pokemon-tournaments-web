<template>
  <base-title type="h4">
    Lista de participantes para el torneo: {{ title }}
  </base-title>
  <hr />
  <table>
    <thead>
      <th>Nombres y Apellidos</th>
      <th>Nickname</th>
    </thead>
    <tbody>
      <tr v-for="competitor of competitors" :key="competitor.id">
        <td>
          {{ competitor.fullName }}
        </td>
        <td class="nickname">
          {{ competitor.nickName }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts">
import { Competitor } from "@/models/competitor.model";
import { defineComponent, PropType } from "vue";
export default defineComponent({
  props: {
    title: {
      type: String as PropType<string>,
      required: true,
    },
    competitors: {
      type: Array as PropType<Competitor[]>,
      required: true,
    },
  },
});
</script>
<style lang="scss" scoped>
table {
  width: 100%;

  td,
  th {
    border: 1px solid black;
    padding: 0.5rem;
  }

  th {
    font-weight: bold;
    background-color: rgb(208, 214, 214);
  }

  .nickname {
    text-align: center;
  }
}
</style>
