<template>
  <ion-page class="ion-page">
    <ion-content padding>
      <ion-list lines="full" mode="ios">
        <ion-card v-for="continent in continents" v-bind:key="continent.name">
          <ion-card-header>
            <ion-card-title>{{continent.name}}</ion-card-title>
          </ion-card-header>

          <ion-card-content>
            I would like to get some milk and also other stufff please. Go out with doggo and do the garden. Thanks
            
          </ion-card-content>
          <button class="red" @click="removeOrder(continent)">Deny</button>
          <button class="green" @click="presentAlertRadio">Accept</button>
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
  },
  methods: {
    removeOrder(continent){
      let index = this.continents.indexOf(continent);

      if(index > -1){
        this.continents.splice(index, 1);
      }
    },
    presentAlertRadio() {
      return this.$ionic.alertController
        .create({
          header: 'Select Timeframe',
          inputs: [
            {
              type: 'radio',
              label: 'now',
              value: 'now',
              checked: true,
            },
            {
              type: 'radio',
              label: 'in 1 Hour',
              value: '1h',
            },
            {
              type: 'radio',
              label: 'in 3 Hours',
              value: '3h',
            }
          ],
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                console.log('Cancelled')
              },
            },
            {
              text: 'Ok',
              handler: () => {
                console.log('Confirm Ok')
              },
            },
          ],
        })
        .then(a => a.present())
    },
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