<template>
  <ion-page class="ion-page">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Orders</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>
      <ion-list lines="full" mode="ios">
        <ion-card v-for="continent in continents" v-bind:key="continent.name">
          <ion-card-header>
            <ion-card-title>{{continent.name}}</ion-card-title>
          </ion-card-header>

          <ion-card-content>
            I would like to get some milk and also other stufff please. Go out with doggo and do the garden. Thanks
            
          </ion-card-content>
          <button class="red">Deny</button>
          <button class="green">Accept</button>
        </ion-card>
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
        name,
        countries{
          name
        }
      }
    }`,
  }
};
</script>

<style>

button {
  color: white;
  text-align: center;
  padding: 0px 15px;
}

ion-card button {
  width: 50%;
  height: 30px;
}

.green {
  background-color: #2dd36f;
}

.red {
  background-color: #eb445a;
}

.green:active {
  background-color: #23a959;
}

.red:active {
  background-color: #db1731;
}

</style>