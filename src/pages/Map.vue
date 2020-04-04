<template>
  <ion-page class="ion-page">
    <ion-content padding>
      <ion-button @click="back()" class="backButton">Back</ion-button>

    </ion-content>
  </ion-page>
</template>

<script>
export default {
  name: "Map",
  methods: {
    back() {
      this.$router.push({ name: "tab1" });
    }
  },
  onCreate() {}
};
</script>

<style>

.backButton {
  margin-top: 20px;
}

</style>
