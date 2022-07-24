<template>
  <base-title type="h4">
    Lista de resultados para el torneo: {{ title }}
  </base-title>
  <hr />
  <div id="table-container">
    <table>
      <thead>
        <th>Puesto</th>
        <th>Puntaje</th>
        <th>Nombres y Apellidos</th>
        <th>Nickname</th>
        <th>Más</th>
      </thead>
      <tbody>
        <tr v-for="result of tournamentResults" :key="result.id">
          <td>
            {{ result.place }}
          </td>
          <td>
            {{ result.score }}
          </td>
          <td>
            {{ result.tournamentInscription?.competitor?.fullName }}
          </td>
          <td class="nickname">
            {{ result.tournamentInscription?.competitor?.nickName }}
          </td>
          <td>
            <a
              v-if="result.hasCertificate"
              :href="result.certificateUrl"
              target="_blank"
            >
              Ver
            </a>
            <span v-else>-</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts">
import { TournamentResult } from "@/models/tournament-result.model";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    title: {
      type: String as PropType<string>,
      required: true,
    },
    tournamentResults: {
      type: Array as PropType<TournamentResult[]>,
      required: true,
    },
  },
});
</script>
<style lang="scss" scoped>
#table-container {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;

  td,
  th {
    border: 1px solid black;
    padding: 0.5rem;
    text-align: center;
  }

  th {
    font-weight: bold;
    background-color: rgb(208, 214, 214);
  }
}
</style>
