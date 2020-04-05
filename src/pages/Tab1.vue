<template>
  <ion-page class="ion-page">
    <ion-content padding>
      <ion-list v-if="myOpenOrders.length > 0" lines="full" mode="ios">
        <ion-card v-for="order in myOpenOrders" v-bind:key="order.id">
          <ion-card-header>
            <ion-card-title>{{order.sender}}</ion-card-title>
          </ion-card-header>
          <ion-card-content style="text-align: left">
            <b>Text:</b>
            {{order.text}}
            <br />
            <b>Address:</b>
            {{order.address}}
          </ion-card-content>
          <button class="green" @click="completeOrder(order)">Complete</button>
        </ion-card>
      </ion-list>
      <p v-else>There are no orders assigned to you right now! :)</p>
      <ion-button @click="nextPage()">Next Page</ion-button>
    </ion-content>
  </ion-page>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "tab1",
  apollo: {
    myOrders: gql`
      query GetMyOrders {
        myOrders {
          id
          text
          sender
          address
          status
          assigned {
            firstName
            lastName
            email
          }
        }
      }
    `
  },
  computed: {
    myOpenOrders() {
      return this.myOrders ? this.myOrders.filter(order => order.status === "OPEN") : []
    }
  },
  methods: {
    async completeOrder(order) {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation($orderId: String!) {
              completeOrder(orderId: $orderId) {
                status
              }
            }
          `,
          variables: {
            orderId: order.id
          }
        })
        .then(() => {
          this.removeOrder(order);
        })
        .catch(error => {
          console.error(error);
        });
    },
    nextPage() {
      this.$router.push({ path: "/map" });
    },
    removeOrder(order) {
      let index = this.myOrders.indexOf(order);

      if (index > -1) {
        this.myOrders.splice(index, 1);
      }
    },
  },
  onCreate() {}
};
</script>

<style scoped>

button {
  color: white;
  text-align: center;
  padding: 0px 15px;
}

ion-card button {
  width: 100%;
  height: 30px;
}

.green {
  background-color: #2dd36f;
}

.green:active {
  background-color: #23a959;
}
</style>