<template>
  <ion-page class="ion-page">
    <ion-content padding>
      <div text-center>
				<h4>Login Form</h4>
			</div>
			<div padding class="loginForm">
				<ion-item>
					<ion-input type="text" placeholder="Benutzername"></ion-input>
				</ion-item>

				<ion-item>
					<ion-input type="password" placeholder="Passwort"></ion-input>
				</ion-item>

        
        <ion-button @click="login()" class="loginButton">Login</ion-button>
			</div>

    </ion-content>
  </ion-page>
</template>

<script>
export default {
  name: "login",
  methods: {
    login() {
      this.$router.push({ name: "tab1" });
    }
  },
  onCreate() {}
};
</script>

<style>
.loginForm {
  width: 80%;
  margin: auto;
}

.loginButton {
  margin-top: 20px;
}

</style>
