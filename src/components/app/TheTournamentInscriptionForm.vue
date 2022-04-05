<template>
  <form @submit.prevent="submitForm">
    <base-label>Equipo Pokemon Showdown (Export)</base-label>
    <base-pokemon-showdown-input v-model.trim="team" />
    <base-button v-if="isNotLoading">
      {{ buttonText }}
    </base-button>
    <span v-else>{{ loadingText }}</span>
  </form>
</template>
<script lang="ts">
import { useInscriptionStore } from "@/stores/inscription";
import { useTournamentStore } from "@/stores/tournament";
import { mapActions, mapState } from "pinia";
import { defineComponent, PropType } from "vue";
export default defineComponent({
  props: {
    isEdit: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  data() {
    return {
      team: "" as string,
    };
  },
  computed: {
    ...mapState(useTournamentStore, ["selectedTournament"]),
    ...mapState(useInscriptionStore, [
      "isLoadingCreateInscription",
      "isLoadingUpdateInscription",
      "myInscription",
    ]),
    isCreate(): boolean {
      return !this.isEdit;
    },
    buttonText(): string {
      return this.isEdit ? "Actualizar inscripción" : "Inscribirme al torneo";
    },
    loadingText(): string {
      return this.isEdit
        ? "Actualizando inscripción ..."
        : "Inscribiendo participante ...";
    },
    isNotLoading(): boolean {
      if (!this.isEdit) return !this.isLoadingCreateInscription;
      return !this.isLoadingUpdateInscription;
    },
  },
  methods: {
    ...mapActions(useInscriptionStore, [
      "createInscription",
      "updateInscription",
    ]),
    async submitForm(): Promise<void> {
      if (this.isEdit) {
        await this.updateInscription(this.team);
      } else {
        await this.createInscription(this.team);
      }

      this.$router.replace({
        name: "Tournament",
        params: {
          tournamentId: this.selectedTournament?.tournament.id,
        },
      });
    },
  },
  mounted(): void {
    if (this.isEdit) {
      this.team = this.myInscription.pokemonShowdownTeam.team;
    }
  },
});
</script>
