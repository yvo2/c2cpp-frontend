<template>
  <div>
    <ion-tabs>
      <ion-tab tab="myOrders" :routes="['myOrders']">
        <ion-vue-router name="myOrders"></ion-vue-router>
      </ion-tab>

      <ion-tab tab="allOrders" :routes="['allOrders']">
        <ion-vue-router name="allOrders"></ion-vue-router>
      </ion-tab>

      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="my-orders">
          <ion-icon name="basket" /> 
        </ion-tab-button>

        <ion-tab-button tab="all-orders">
          <ion-icon name="people" />
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </div>
</template>

<script>
import { people, basket } from "ionicons/icons";
import { addIcons } from "ionicons";

import { mapState } from "vuex";

addIcons({
  "ios-people": people.ios,
  "md-people": people.md,
  "ios-basket": basket.ios,
  "md-basket": basket.md
});

export default {
  name: "home",
  watch: {
    accessToken: {
      handler: function(token) {
        console.log(token)
        if (!token) this.$router.push({ name: "signup" });
      },
      immediate: true
    }
  },
  computed: {
    ...mapState(['accessToken'])
  }
};
</script>