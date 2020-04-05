<template>
  <ion-page class="ion-page">
    <ion-content padding>
      <ion-list v-if="openOrders.length > 0" lines="full" mode="ios">
        <ion-card v-for="order in openOrders" v-bind:key="order.id">
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
          <button class="red" @click="removeOrder(order)">Deny</button>
          <button class="green" @click="presentDeliveryAlert(order)">Accept</button>
        </ion-card>
      </ion-list>
      <p v-else>There are no open order right now! :)</p>
    </ion-content>
  </ion-page>
</template>

<script>
import gql from "graphql-tag";
import { mapState, mapMutations } from "vuex";

export default {
  name: "tab2",
  apollo: {
    allOrders: gql`
      query GetOrders {
        allOrders {
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
    ...mapState(['deniedOrderIds']),
    openOrders() {
      return this.allOrders ? this.allOrders.filter(order => order.status === "OPEN" && !this.deniedOrderIds.includes(order.id)) : []
    }
  },
  methods: {
    ...mapMutations(['setDeniedOrderIds']),
    removeOrder(order) {
      let index = this.allOrders.indexOf(order);

      if (index > -1) {
        this.allOrders.splice(index, 1);
      }

      let deniedOrders = this.deniedOrderIds;
      deniedOrders.push(order.id)
      this.setDeniedOrderIds(deniedOrders)
    },
    async assignOrder(order, delivery) {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation($arrival: String!, $orderId: String!) {
              assignToMe(arrival: $arrival, orderId: $orderId) {
                status
              }
            }
          `,
          variables: {
            arrival: delivery,
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
    presentDeliveryAlert(order) {
      const self = this;
      return this.$ionic.alertController
        .create({
          header: "Select Timeframe",
          inputs: [
            {
              type: "radio",
              label: "now",
              value: "now",
              checked: true
            },
            {
              type: "radio",
              label: "in 1 Hour",
              value: "1h"
            },
            {
              type: "radio",
              label: "in 3 Hours",
              value: "3h"
            }
          ],
          buttons: [
            {
              text: "Cancel",
              role: "cancel",
              cssClass: "secondary"
            },
            {
              text: "Ok",
              handler: answer => {
                self.assignOrder(order, answer);
              }
            }
          ]
        })
        .then(a => a.present());
    }
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