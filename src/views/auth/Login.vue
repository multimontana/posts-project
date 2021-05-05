<template>
  <v-container fluid>
    <v-layout row wrap mt-10>
      <v-flex xs12 class="text-xs-center text-center" mt-5>
        <h1>Sign In</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <form>
          <v-layout column>
            <v-flex>
              <v-text-field
                name="email"
                label="Email"
                id="email"
                type="email"
                v-model="$v.login.username.$model"
                :class="{ 'is-invalid': ($v.login.username.$dirty && $v.login.username.$invalid)}"
                ></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="password"
                label="Password"
                id="password"
                type="password"
                v-model="$v.login.password.$model"
                :class="{ 'is-invalid': ($v.login.password.$dirty && $v.login.password.$invalid)}"
                ></v-text-field>
            </v-flex>
            <v-flex class="text-xs-center" mt-5>
              <v-btn color="primary" type="submit" @click.prevent="logIn">Sign In</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      login: {
        username: '',
        password: ''
      }
    }
  },
  validations: {
    login: {
      username: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6)
      }
    }
  },
  methods: {
    ...mapActions(['loginUserAction']),
    logIn () {
      this.loginUserAction({ ...this.login, grant_type: 'password' }).then((response) => {
        if (response) {
          this.$router.push('/')
        }
      })
    }
  }
}
</script>
