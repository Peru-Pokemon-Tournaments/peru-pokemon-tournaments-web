import { App } from "vue";
import BaseButton from "@/components/ui/buttons/BaseButton.vue";
import BaseCard from "@/components/ui/cards/BaseCard.vue";
import BasePicture from "@/components/ui/images/BasePicture.vue";
import BaseInput from "@/components/ui/inputs/BaseInput.vue";
import BaseLabel from "@/components/ui/semantics/BaseLabel.vue";
import BaseTitle from "@/components/ui/semantics/BaseTitle.vue";
import BaseLoader from "@/components/ui/loaders/BaseLoader.vue";

export const addComponents = (app: App): void => {
  app.component("base-button", BaseButton);
  app.component("base-card", BaseCard);
  app.component("base-picture", BasePicture);
  app.component("base-input", BaseInput);
  app.component("base-label", BaseLabel);
  app.component("base-title", BaseTitle);
  app.component("base-loader", BaseLoader);
};
