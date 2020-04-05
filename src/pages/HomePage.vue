<template>
  <div>
    <ion-tabs>
      <ion-tab tab="tab1" :routes="['tab1']">
        <ion-vue-router name="tab1"></ion-vue-router>
      </ion-tab>

      <ion-tab tab="tab2" :routes="['tab2']">
        <ion-vue-router name="tab2"></ion-vue-router>
      </ion-tab>

      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1">
          <ion-icon name="basket" /> 
        </ion-tab-button>

        <ion-tab-button tab="tab2">
          <ion-icon name="people" />
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </div>
</template>

<script>
import { people, basket } from "ionicons/icons";
import { addIcons } from "ionicons";

addIcons({
  "ios-people": people.ios,
  "md-people": people.md,
  "ios-basket": basket.ios,
  "md-basket": basket.md
});

export default {
  name: "HelloWorld",
  props: {},
};
</script>