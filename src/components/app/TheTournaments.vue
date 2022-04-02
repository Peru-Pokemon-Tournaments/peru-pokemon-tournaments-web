<template>
  <ul id="tournaments">
    <li v-for="tournament in allTournaments" :key="tournament.id">
      <base-tournament-card :tournament="tournament" />
    </li>
  </ul>
</template>
<script lang="ts">
import { mapActions, mapState } from "pinia";
import { defineComponent } from "vue";
import { useUserStore } from "@/stores/user/index";
import { useTournamentStore } from "@/stores/tournament/index";
import BaseTournamentCard from "@/components/ui/cards/BaseTournamentCard.vue";

export default defineComponent({
  components: {
    BaseTournamentCard,
  },
  computed: {
    ...mapState(useTournamentStore, ["allTournaments"]),
    ...mapState(useUserStore, ["isLoggedIn"]),
  },
  methods: {
    ...mapActions(useTournamentStore, ["loadTournaments"]),
  },
  mounted(): void {
    this.loadTournaments();
  },
});
</script>
<style lang="scss" scoped>
#tournaments {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 1rem;

  > li {
    // width: calc(100% - 20rem);
    max-width: 50rem;
    min-width: 10rem;
  }
}
</style>
