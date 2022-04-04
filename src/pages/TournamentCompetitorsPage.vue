<template>
  <the-main-layout id="layout">
    <template v-slot:navbar>
      <the-navbar></the-navbar>
    </template>
    <base-card v-if="!isLoadingCompetitors" id="competitors-card">
      <the-tournament-competitors-table
        :title="'Es un torneo de prueba'"
        :competitors="selectedTournamentCompetitors"
      />
      <footer>
        <router-link :to="`/tournaments/${tournamentId}`">
          <base-button>Ir a detalles del torneo</base-button>
        </router-link>
      </footer>
    </base-card>
    <div v-else id="center">
      <base-loader />
      Cargando ...
    </div>
  </the-main-layout>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import TheMainLayout from "@/components/layouts/TheMainLayout.vue";
import TheNavbar from "@/components/app/TheNavbar.vue";
import TheTournamentCompetitorsTable from "@/components/app/TheTournamentCompetitorsTable.vue";
import { mapActions, mapState } from "pinia";
import { useTournamentStore } from "@/stores/tournament";

export default defineComponent({
  components: {
    TheMainLayout,
    TheNavbar,
    TheTournamentCompetitorsTable,
  },
  props: {
    tournamentId: {
      type: String as PropType<string>,
      required: true,
    },
  },
  computed: {
    ...mapState(useTournamentStore, [
      "selectedTournamentCompetitors",
      "isLoadingCompetitors",
    ]),
  },
  methods: {
    ...mapActions(useTournamentStore, ["loadTournamentCompetitors"]),
  },
  mounted(): void {
    this.loadTournamentCompetitors(this.tournamentId);
  },
});
</script>
<style lang="scss" scoped>
#layout {
  background-color: $base-secondary-background-color;

  #competitors-card {
    width: calc(100% - 2rem);

    footer {
      padding-top: 1rem;
      display: flex;
      justify-content: center;
      flex-direction: row;
      width: 100%;

      a {
        text-decoration: none;
      }
    }
  }

  #center {
    width: 100%;
    margin-top: 10rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
  }
}
</style>
