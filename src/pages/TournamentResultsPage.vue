<template>
  <the-main-layout id="layout">
    <template v-slot:navbar>
      <the-navbar></the-navbar>
    </template>
    <base-card v-if="!isLoadingTournamentResults" id="tournament-results-card">
      <the-tournament-results-table
        :title="selectedTournamentTitle"
        :tournamentResults="selectedTournamentResults"
        v-if="hasSelectedTournamentResults"
      />
      <span v-else id="not-found">Sin resultados</span>
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
import TheTournamentResultsTable from "@/components/app/TheTournamentResultsTable.vue";
import { mapActions, mapState } from "pinia";
import { useTournamentStore } from "@/stores/tournament";

export default defineComponent({
  components: {
    TheMainLayout,
    TheNavbar,
    TheTournamentResultsTable,
  },
  props: {
    tournamentId: {
      type: String as PropType<string>,
      required: true,
    },
  },
  computed: {
    ...mapState(useTournamentStore, [
      "hasSelectedTournament",
      "selectedTournamentResults",
      "isLoadingTournamentResults",
      "selectedTournament",
      "hasSelectedTournamentResults",
    ]),
    selectedTournamentTitle(): string {
      if (this.hasSelectedTournament) {
        return this.selectedTournament!.tournament!.title;
      }

      return "-";
    },
  },
  methods: {
    ...mapActions(useTournamentStore, [
      "loadTournamentResults",
      "loadTournament",
    ]),
  },
  mounted(): void {
    this.loadTournamentResults(this.tournamentId);

    if (!this.hasSelectedTournament) {
      this.loadTournament(this.tournamentId);
    }
  },
});
</script>
<style lang="scss" scoped>
#layout {
  background-color: $base-secondary-background-color;

  #tournament-results-card {
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

  #not-found {
    text-align: center;
    width: 100%;
    display: block;
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
