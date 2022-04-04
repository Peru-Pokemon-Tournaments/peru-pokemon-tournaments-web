<template>
  <the-main-layout id="layout">
    <template v-slot:navbar>
      <the-navbar></the-navbar>
    </template>
    <the-complete-tournament
      v-if="hasSelectedTournament"
      :tournament="selectedTournament.tournament"
      :details="selectedTournament"
    />
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
import TheCompleteTournament from "@/components/app/TheCompleteTournament.vue";
import { mapActions, mapState } from "pinia";
import { useTournamentStore } from "@/stores/tournament";
import { useUserStore } from "@/stores/user";

export default defineComponent({
  components: {
    TheMainLayout,
    TheNavbar,
    TheCompleteTournament,
  },
  props: {
    tournamentId: {
      type: String as PropType<string>,
      required: true,
    },
  },
  computed: {
    ...mapState(useTournamentStore, [
      "selectedTournament",
      "hasSelectedTournament",
    ]),
  },
  methods: {
    ...mapActions(useTournamentStore, ["loadTournament"]),
    ...mapActions(useUserStore, ["loadEnrollment"]),
  },
  mounted(): void {
    this.loadTournament(this.tournamentId);
    this.loadEnrollment(this.tournamentId);
  },
});
</script>
<style lang="scss" scoped>
#layout {
  background-color: $base-secondary-background-color;

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
