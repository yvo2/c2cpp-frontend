<template>
  <div>
    <ion-tabs>
      <ion-tab tab="my-orders" :routes="['myOrders']">
        <ion-vue-router name="myOrders"></ion-vue-router>
      </ion-tab>

      <ion-tab tab="all-orders" :routes="['allOrders']">
        <ion-vue-router name="allOrders"></ion-vue-router>
      </ion-tab>

      <ion-tab-bar slot="bottom" :selected-tab="selectedTab">
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
    $route: {
      handler: function(to) {
        this.selectedTab = to.path.substr(1);
      },
      immediate: true
    },
    accessToken: {
      handler: function(token) {
        console.log(token)
        if (!token) this.$router.push({ name: "signup" });
      },
      immediate: true
    }
  },
  data() {
    return {
      selectedTab: "",
    }
  },
  computed: {
    ...mapState(['accessToken'])
  }
};
</script>