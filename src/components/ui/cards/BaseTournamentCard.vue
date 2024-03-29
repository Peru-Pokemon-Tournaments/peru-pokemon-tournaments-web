<template>
  <base-card class="tournament-card">
    <div id="content">
      <picture>
        <img
          id="image"
          :src="tournament.hasImage ? tournament.imageUrl : defaultImage"
        />
      </picture>
      <div>
        <h2>{{ tournament.title }}</h2>
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
        <footer>
          <ul id="actions">
            <li>
              <router-link :to="`/tournaments/${tournament.id}`">
                <base-button>Ver detalles</base-button>
              </router-link>
            </li>
          </ul>
        </footer>
      </div>
    </div>
  </base-card>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Tournament } from "@/models/tournament.model";
import { mapState } from "pinia";
import { useUserStore } from "@/stores/user";

export default defineComponent({
  props: {
    tournament: {
      type: Object as PropType<Tournament>,
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
.tournament-card {
  height: fit-content;
  min-width: 5rem;
  max-width: 40rem;
  margin: 1rem;
  width: calc(100% - 2rem);

  #content {
    height: 100%;
    display: flex;
    flex-direction: row;

    picture {
      min-width: 12.5rem;
      width: 12.5rem;
      height: 12.5rem;

      @media (max-width: 750px) {
        display: none;
      }

      #image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    > div {
      margin-left: 1rem;

      @media (max-width: 750px) {
        margin-left: 0;
      }

      h2 {
        font-size: 1.1rem;
        font-weight: bold;
        text-overflow: visible;
      }

      p {
        line-height: 1;
        text-overflow: ellipsis;
      }

      #details li {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.3rem;

        @media (max-width: 740px) {
          display: block;
        }

        b {
          font-weight: bold;

          @media (max-width: 740px) {
            display: block;
          }
        }

        span {
          text-align: right;

          @media (max-width: 740px) {
            display: block;
          }
        }
      }

      #actions {
        text-align: right;

        li {
          width: fit-content;
          display: inline-block;

          margin-left: 0.5rem;

          a {
            text-decoration: none;
          }
        }
      }
    }
  }
}
</style>
