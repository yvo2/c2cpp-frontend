<template>
  <ion-page class="ion-page">
    <ion-content padding style="text-align: left">
      <ion-refresher slot="fixed" @ionRefresh="refresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <ion-text>
        <h1 style="font-weight: 600; margin: 35px 15px">My Orders</h1>
      </ion-text>
      <div v-if="myOpenOrders.length > 0">
        <ion-list lines="full" mode="ios">
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
        <div class="navigation">
          <a
            :href="`https://www.google.com/maps/dir/?api=1&origin=&destination=bern&travelmode=bicycling`"
            target="_blank"
          >
            <ion-button expand="full" color="success">Start navigation!</ion-button>
          </a>
        </div>
      </div>
      <p v-else style="padding: 0 15px">There are no orders assigned to you right now! :)</p>
    </ion-content>
  </ion-page>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "myOrders",
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
      return this.myOrders
        ? this.myOrders.filter(order => order.status === "ASSIGNED")
        : [];
    }
  },
  methods: {
    refresh(event) {
      this.$apollo.queries.myOrders.refetch();
      const self = this;
      setTimeout(function() {
        const isLoading = setInterval(function() {
          if (!self.$apollo.queries.myOrders.loading) {
            event.target.complete();
            clearInterval(isLoading);
          }
        }, 100);
      }, 500);
    },
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
    }
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