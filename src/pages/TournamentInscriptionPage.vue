<template>
  <the-main-layout id="layout">
    <template v-slot:navbar>
      <the-navbar></the-navbar>
    </template>
    <section id="content" v-if="hasSelectedTournament">
      <picture>
        <img id="image" :src="tournamentImage" />
      </picture>
      <base-card id="primary-card">
        <base-title type="h3">
          Inscripción al torneo:
          <b>{{ selectedTournament.tournament.title }}</b>
        </base-title>
        <hr />
        <the-tournament-inscription-form />
      </base-card>
    </section>
  </the-main-layout>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import TheMainLayout from "@/components/layouts/TheMainLayout.vue";
import TheNavbar from "@/components/app/TheNavbar.vue";
import TheTournamentInscriptionForm from "@/components/app/TheTournamentInscriptionForm.vue";
import { mapActions, mapState } from "pinia";
import { useTournamentStore } from "@/stores/tournament";
import { useUserStore } from "@/stores/user";

export default defineComponent({
  components: {
    TheMainLayout,
    TheNavbar,
    TheTournamentInscriptionForm,
  },
  props: {
    tournamentId: {
      type: String as PropType<string>,
      required: true,
    },
    inscriptionId: {
      type: String as PropType<string>,
      required: false,
    },
  },
  computed: {
    ...mapState(useTournamentStore, [
      "selectedTournament",
      "hasSelectedTournament",
    ]),
    ...mapState(useUserStore, ["isEnrolledToSelectedTournament"]),
    defaultImage() {
      return require("@/assets/img/logo.png");
    },
    tournamentImage() {
      return this.hasSelectedTournament &&
        this.selectedTournament!.tournament.hasImage
        ? this.selectedTournament!.tournament.imageUrl
        : this.defaultImage;
    },
  },
  methods: {
    ...mapActions(useTournamentStore, ["loadTournament"]),
    ...mapActions(useUserStore, ["loadEnrollment"]),
  },
  watch: {
    isEnrolledToSelectedTournament(isEnrolled: boolean): void {
      if (isEnrolled) {
        this.$router.replace({
          name: "Tournament",
          params: {
            tournamentId: this.tournamentId,
          },
        });
      }
    },
  },
  beforeMount(): void {
    if (
      !this.hasSelectedTournament ||
      this.selectedTournament!.tournament.id !== this.tournamentId
    ) {
      this.loadTournament(this.tournamentId);
      this.loadEnrollment(this.tournamentId);
    }
  },
});
</script>
<style lang="scss" scoped>
#layout {
  background-color: $base-secondary-background-color;

  #content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  picture {
    width: 100%;
    height: 8rem;

    img {
      width: 100%;
      height: 15rem;
      object-fit: cover;
    }
  }

  #primary-card {
    width: calc(100% - 2rem);
    max-width: 50rem;
    font-size: 0.9rem;
    margin-top: 0;
  }
}
</style>
