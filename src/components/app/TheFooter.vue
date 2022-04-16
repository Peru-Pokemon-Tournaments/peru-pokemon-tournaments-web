<template>
  <footer>
    <ul>
      <li v-for="partner of partners" :key="partner.name">
        <figure>
          <img :src="partner.logo" :alt="partner.name" />
          <figcaption>
            <a :href="partner.page">
                {{ partner.name }}
            </a>
          </figcaption>
        </figure>
      </li>
    </ul>
  </footer>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      partners: [
        {
          logo: require("@/assets/img/partner_logo_01.png"),
          name: "Slayer Store",
          page: "https://www.facebook.com/SlayerStoreFB",
        },
      ],
    };
  },
});
</script>
<style lang="scss" scoped>
footer {
  width: 100%;
  height: 8rem;
  padding: 1rem;
  background-color: $base-primary-footer-color;
  color: $base-primary-footer-font-color;

  ul {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    figure {
      text-align: center;

      figcaption {
        letter-spacing: 2px;
        opacity: 0.5;

        a {
            text-decoration: none;
            color: $base-primary-footer-font-color;

            &:hover {
                font-weight: bold;
            }
        }
      }
    }
  }

  img {
    height: 4rem;
  }
}
</style>
