<template>
  <ion-page class="ion-page">
    <ion-content padding>
      <div class="navigation">
      <a
        :href="`https://www.google.com/maps/dir/?api=1&origin=&destination=bern&travelmode=bicycling`"
        target="_blank"
      >
        <ion-button expand="full" color="success">Start navigation!</ion-button>
      </a>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
export default {
  name: "tab1",
  methods: {
    nextPage() {
      this.$router.push({ path: "/map" });
    }
  },
  onCreate() {}
};
</script>

<style scoped>
.navigation {
  position: absolute;
  bottom: 10px;
  padding: 0 10px;
  width: 100%;
}

.navigation > a {
  text-decoration: none;
}
</style>