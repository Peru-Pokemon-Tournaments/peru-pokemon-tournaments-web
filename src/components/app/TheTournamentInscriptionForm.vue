<template>
  <form @submit.prevent="submitForm">
    <base-label>Equipo Pokemon Showdown (Export)</base-label>
    <base-pokemon-showdown-input v-model.trim="team" />
    <base-button v-if="!isLoadingCreateInscription"> Inscribirme </base-button>
    <span v-else>Inscribiendo participante...</span>
  </form>
</template>
<script lang="ts">
import { useInscriptionStore } from "@/stores/inscription";
import { useTournamentStore } from "@/stores/tournament";
import { mapActions, mapState } from "pinia";
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      team: "" as string,
    };
  },
  computed: {
    ...mapState(useTournamentStore, ["selectedTournament"]),
    ...mapState(useInscriptionStore, ["isLoadingCreateInscription"]),
  },
  methods: {
    ...mapActions(useInscriptionStore, ["createInscription"]),
    async submitForm(): Promise<void> {
      await this.createInscription(this.team);

      this.$router.replace({
        name: "Tournament",
        params: {
          tournamentId: this.selectedTournament?.tournament.id,
        },
      });
    },
  },
});
</script>
