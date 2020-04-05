<template>
  <ion-page class="ion-page">
    <ion-content padding>
      <div class="form-structor">
        <form
          class="signup"
          :class="{'slide-up': activeContainer === 'login'}"
          @submit.prevent="signUp"
          name="signUpForm"
        >
          <router-link to="/signup" tag="div">
            <h2 class="form-title">
              <span>or</span>Sign up
            </h2>
          </router-link>
          <div class="form-holder">
            <ion-input
              required
              autocapitalize
              autocomplete
              type="text"
              inputmode="text"
              minlength="2"
              class="input"
              placeholder="First name"
              :value="signUpFirstName"
              @input="signUpFirstName = $event.target.value"
            />
            <ion-input
              required
              autocapitalize
              autocomplete
              type="text"
              inputmode="text"
              minlength="2"
              class="input"
              placeholder="Last name"
              :value="signUpLastName"
              @input="signUpLastName = $event.target.value"
            />
            <ion-input
              required
              autocapitalize
              autocomplete
              type="email"
              inputmode="email"
              class="input"
              placeholder="Email"
              :value="signUpEmail"
              @input="signUpEmail = $event.target.value"
            />
            <ion-input
              required
              autocapitalize
              autocomplete
              type="password"
              inputmode="password"
              minlength="8"
              class="input"
              placeholder="Password"
              :value="signUpPassword"
              @input="signUpPassword = $event.target.value"
            />
          </div>
          <ion-button color="light" size="small" style="margin-top: 15px; width: 100%">
            Sign up
            <input
              type="submit"
              style="visibility: hidden; width: 0; padding: 0; border: 0;"
            />
          </ion-button>
        </form>
        <form
          class="login"
          :class="{'slide-up': activeContainer === 'signup'}"
          @submit.prevent="login"
          name="loginForm"
        >
          <div class="center">
            <router-link to="/login" tag="div">
              <h2 class="form-title">
                <span>or</span>Log in
              </h2>
            </router-link>
            <div class="form-holder">
              <ion-input
                type="email"
                class="input"
                placeholder="Email"
                :value="loginEmail"
                @input="loginEmail = $event.target.value"
              />
              <ion-input
                type="password"
                class="input"
                placeholder="Password"
                :value="loginPassword"
                @input="loginPassword = $event.target.value"
              />
            </div>
            <ion-button
              type="submit"
              color="medium"
              size="small"
              style="margin-top: 15px; width: 100%"
            >
              Log in
              <input
                type="submit"
                style="visibility: hidden; width: 0; padding: 0; border: 0;"
              />
            </ion-button>
          </div>
        </form>
      </div>
    </ion-content>
    <ion-alert-controller></ion-alert-controller>
  </ion-page>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "login",
  data() {
    return {
      activeContainer: null,
      loginResult: null,
      loginEmail: "",
      loginPassword: "",
      signUpFirstName: "",
      signUpLastName: "",
      signUpEmail: "",
      signUpPassword: ""
    };
  },
  watch: {
    $route: {
      handler: function(to) {
        this.activeContainer = to.path.substr(1);
      },
      immediate: true
    }
  },
  methods: {
    showLoginError() {
      document
        .querySelector("ion-alert-controller")
        .create({
          header: "Login failed!",
          message: `Could not login, please try again`,
          buttons: [
            {
              text: "OK"
            }
          ]
        })
        .then(alert => alert.present());
    },
    login() {
      const loginEmail = this.loginEmail;
      const loginPassword = this.loginPassword;

      this.loginEmail = "";
      this.loginPassword = "";

      this.$apollo
        .query({
          query: gql`
            query($password: String!, $email: String!) {
              login(password: $password, email: $email) {
                accessToken
                error
              }
            }
          `,
          variables: {
            password: loginPassword,
            email: loginEmail
          }
        })
        .then(res => {
          if (res.data.login.error) {
            this.showLoginError();

            this.loginEmail = loginEmail;
            this.loginPassword = loginPassword;
          } else {
            console.log(res.data.login.accessToken);
            this.$router.push({ name: "tab1" });
          }
        })
        .catch(() => {
          this.showLoginError();

          this.loginEmail = loginEmail;
          this.loginPassword = loginPassword;
        });
    },
    signUp() {
      const signUpFirstName = this.signUpFirstName;
      const signUpLastName = this.signUpLastName;
      const signUpEmail = this.signUpEmail;
      const signUpPassword = this.signUpPassword;

      this.signUpFirstName = "";
      this.signUpLastName = "";
      this.signUpEmail = "";
      this.signUpPassword = "";

      this.$apollo
        .mutate({
          mutation: gql`
            mutation($newUser: UserNew!) {
              register(newUserData: $newUser) {
                access {
                  accessToken
                }
              }
            }
          `,
          variables: {
            newUser: {
              firstName: signUpFirstName,
              lastName: signUpLastName,
              email: signUpEmail,
              password: signUpPassword
            }
          }
        })
        .then(data => {
          console.log(data.register.access.accessToken);
          this.$router.push({ name: "tab1" });
        })
        .catch(error => {
          if (error.message.includes("EMAIL_EXIST")) {
            document
              .querySelector("ion-alert-controller")
              .create({
                header: "Email exists!",
                message: `Email address "<strong>${signUpEmail}</strong>" already exists. Please use a different one or log in`,
                buttons: [
                  {
                    text: "OK"
                  }
                ]
              })
              .then(alert => alert.present());
          }

          this.signUpFirstName = signUpFirstName;
          this.signUpLastName = signUpLastName;
          this.signUpEmail = signUpEmail;
          this.signUpPassword = signUpPassword;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
body {
  overflow: hidden;
}

.form-structor {
  background-color: #222;
  height: 100%;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    opacity: 0.8;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-repeat: no-repeat;
    background-position: left bottom;
    background-size: cover;
    background-image: url("https://i.pinimg.com/736x/b8/09/22/b80922f6ea2daaf36a6627378662803b--deck-of-cards-phone-wallpapers.jpg");
  }

  .signup {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 65%;
    z-index: 5;
    transition: all 0.3s ease;

    &.slide-up {
      top: 5%;
      transform: translate(-50%, 0%);
      transition: all 0.3s ease;
    }

    &.slide-up .form-holder,
    &.slide-up .submit-btn {
      opacity: 0;
      visibility: hidden;
    }

    &.slide-up .form-title {
      font-size: 1em;
      cursor: pointer;
    }

    &.slide-up .form-title span {
      margin-right: 5px;
      opacity: 1;
      visibility: visible;
      transition: all 0.3s ease;
    }

    .form-title {
      color: #fff;
      font-size: 1.7em;
      text-align: center;

      span {
        color: rgba(0, 0, 0, 0.4);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
      }
    }

    .form-holder {
      text-align: left;
      border-radius: 10px;
      background-color: #fff;
      overflow: hidden;
      margin-top: 50px;
      opacity: 1;
      visibility: visible;
      transition: all 0.3s ease;

      .input {
        border: 0;
        outline: none;
        box-shadow: none;
        display: block;
        height: 35px;
        line-height: 35px;
        padding: 10px 15px;
        border-bottom: 1px solid #eee;
        width: 100%;
        font-size: 12px;

        &:last-child {
          border-bottom: 0;
        }
        &::input-placeholder {
          color: rgba(0, 0, 0, 0.4);
        }
      }
    }
  }

  .login {
    position: absolute;
    top: 20%;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 5;
    transition: all 0.3s ease;

    &::before {
      content: "";
      position: absolute;
      left: 50%;
      top: -20px;
      transform: translate(-50%, 0);
      background-color: #fff;
      width: 200%;
      height: 250px;
      border-radius: 50%;
      z-index: 4;
      transition: all 0.3s ease;
    }

    .center {
      position: absolute;
      top: calc(50% - 10%);
      left: 50%;
      transform: translate(-50%, -50%);
      width: 65%;
      z-index: 5;
      transition: all 0.3s ease;

      .form-title {
        color: #000;
        font-size: 1.7em;
        text-align: center;

        span {
          color: rgba(0, 0, 0, 0.4);
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }
      }

      .form-holder {
        border-radius: 10px;
        background-color: #fff;
        border: 1px solid #eee;
        overflow: hidden;
        margin-top: 50px;
        opacity: 1;
        visibility: visible;
        transition: all 0.3s ease;

        .input {
          border: 0;
          outline: none;
          box-shadow: none;
          display: block;
          height: 35px;
          line-height: 35px;
          padding: 10px 15px;
          border-bottom: 1px solid #eee;
          width: 100%;
          font-size: 12px;

          &:last-child {
            border-bottom: 0;
          }
          &::-webkit-input-placeholder {
            color: rgba(0, 0, 0, 0.4);
          }
        }
      }

      .submit-btn {
        background-color: #6b92a4;
        color: rgba(256, 256, 256, 0.7);
        border: 0;
        border-radius: 15px;
        display: block;
        margin: 15px auto;
        padding: 15px 45px;
        width: 100%;
        font-size: 13px;
        font-weight: bold;
        cursor: pointer;
        opacity: 1;
        visibility: visible;
        transition: all 0.3s ease;

        &:hover {
          transition: all 0.3s ease;
          background-color: rgba(0, 0, 0, 0.8);
        }
      }
    }

    &.slide-up {
      top: 90%;
      transition: all 0.3s ease;
    }

    &.slide-up .center {
      top: 10%;
      transform: translate(-50%, 0%);
      transition: all 0.3s ease;
    }

    &.slide-up .form-holder,
    &.slide-up .submit-btn {
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    }

    &.slide-up .form-title {
      font-size: 1em;
      margin: 0;
      padding: 0;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    &.slide-up .form-title span {
      margin-right: 5px;
      opacity: 1;
      visibility: visible;
      transition: all 0.3s ease;
    }
  }
}
</style>
