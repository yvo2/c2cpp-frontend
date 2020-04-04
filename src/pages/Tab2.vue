<template>
  <ion-page class="ion-page">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Ionic4 VueJS: Tab 2</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>
      <ion-list>
        <ion-item v-for="continent in continents" v-bind:key="continent.name">
          {{continent.name}}
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: "tab2",
  apollo: {
    continents: gql`query {
      continents {
        name
      }
    }`,
  }
};
</script>

<style>
</style>