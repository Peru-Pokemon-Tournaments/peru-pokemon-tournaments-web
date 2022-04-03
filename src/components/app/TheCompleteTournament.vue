<template>
  <section id="content">
    <picture>
      <img
        id="image"
        :src="tournament.hasImage ? tournament.imageUrl : defaultImage"
      />
    </picture>
    <base-card id="primary-card">
      <base-title>{{ tournament.title }}</base-title>
      <hr />
      <p>{{ tournament.description }}</p>
      <hr />
      <ul id="details">
        <li>
          <b>Lugar: </b>
          <span>{{ tournament.place }}</span>
        </li>
        <li>
          <b>Fecha y hora de inicio: </b>
          <span>
            {{ tournament.startDate.toString("dd/MM/yyyy hh:mm tt") }}
          </span>
        </li>
        <li>
          <b>Fecha y hora de finalización: </b>
          <span>
            {{ tournament.endDate.toString("dd/MM/yyyy hh:mm tt") }}
          </span>
        </li>
        <li>
          <b>Tipo: </b>
          <span>
            {{ tournament.type.name }}
          </span>
        </li>
        <li>
          <b>Formato: </b>
          <span>
            {{ tournament.format.name }}
          </span>
        </li>
        <li>
          <b>Precio: </b>
          <span>
            {{ tournament.price.formatted }}
          </span>
        </li>
      </ul>
      <section>
        <ul id="actions">
          <li>
            <base-button>Participantes</base-button>
          </li>
          <li v-if="isLoggedIn">
            <base-button>Inscribirme</base-button>
          </li>
          <li v-else>
            <base-button>Iniciar sesión para inscribirme</base-button>
          </li>
          <li v-if="isLoggedIn">
            <base-button>Modificar mi inscripción</base-button>
          </li>
        </ul>
      </section>
    </base-card>
    <base-card id="prizes-card">
      <base-title type="h2">Premios</base-title>
      <hr />
      <ul>
        <li v-for="prize of details.prizes" :key="prize.id">
          <b>{{ prize.title }}: </b>
          <span>{{ prize.description }}</span>
        </li>
      </ul>
    </base-card>
    <base-card id="rules-card">
      <base-title type="h2">Reglas</base-title>
      <hr />
      <base-title type="h4">Clauses:</base-title>
      <hr />
      <ul>
        <li v-for="rule of details.rules" :key="rule.id">
          <b>{{ rule.name }}: </b>
          <span>{{ rule.description }}</span>
        </li>
      </ul>
      <hr />
      <base-title type="h4">Dispositivos permitidos:</base-title>
      <hr />
      <ul>
        <li v-for="device of details.devices" :key="device.id">
          <span>{{ device.name }}</span>
        </li>
      </ul>
      <hr />
      <base-title type="h4">Juegos permitidos:</base-title>
      <hr />
      <ul>
        <li v-for="game of details.games" :key="game.id">
          <span>{{ game.name }}</span>
        </li>
      </ul>
    </base-card>
    <base-card v-if="details.hasExternalBracket" id="external-bracket-card">
      <base-title type="h4">Brackets:</base-title>
      <hr />
      <b>Lugar: </b><span>{{ details.externalBracket.reference }}</span>
      <a :href="details.externalBracket.url">Ir al sitio</a>
    </base-card>
  </section>
</template>

<script lang="ts">
import { CompleteTournament } from "@/models/complete-tournament.model";
import { Tournament } from "@/models/tournament.model";
import { useUserStore } from "@/stores/user";
import { mapState } from "pinia";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    tournament: {
      type: Object as PropType<Tournament>,
      required: true,
    },
    details: {
      type: Object as PropType<CompleteTournament>,
      required: true,
    },
  },
  computed: {
    ...mapState(useUserStore, ["isLoggedIn"]),
    defaultImage() {
      return require("@/assets/img/logo.png");
    },
  },
});
</script>
<style lang="scss" scoped>
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

b {
  font-weight: bold;
  font-size: 1rem;
}

#primary-card,
#prizes-card,
#rules-card,
#external-bracket-card {
  width: calc(100% - 2rem);
  max-width: 50rem;
  font-size: 0.9rem;
  margin-top: 0;
}

#actions {
  text-align: right;

  li {
    width: fit-content;
    display: inline-block;

    margin-left: 0.5rem;
  }
}
</style>
