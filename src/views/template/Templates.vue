<template>
  <div>
    <v-card
      max-width="800"
      mt-10
      min-height="600"
      max-height="700"
      class="mx-auto mt-10"
    >
      <v-toolbar
        color="cyan"
        dark
      >
        <v-toolbar-title>Templates</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="$router.push({ name: 'template-form' })">
          <v-icon>mdi-card-plus</v-icon>
        </v-btn>
      </v-toolbar>
      <v-list three-line>
        <template v-for="(item, index) in getTemplatesList">
          <v-divider
            :key="index"
            :inset="true"
          ></v-divider>

          <v-list-item
            :key="item.Name"
          >
            <v-list-item-content>
              <v-list-item-title v-text="item.Name"></v-list-item-title>
              <v-list-item-subtitle>Posts <strong>{{ item.Posts }}</strong></v-list-item-subtitle>
              <v-list-item-subtitle>Date created <strong>{{ item.DateCreated }}</strong></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click="removeTemplate(item.Id)">
                <v-icon color="grey lighten-1">mdi-delete</v-icon>
              </v-btn>
              <v-btn icon @click="$router.push({ name: 'template-form', params: { id: item.Id } })">
                <v-icon color="grey lighten-1">mdi-file-edit</v-icon>
              </v-btn>
              <v-btn icon @click="$router.push({ name: 'template-show', params: { id: item.Id } })">
                <v-icon color="grey lighten-1">mdi-eye-outline</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </template>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapGetters(['getTemplatesList'])
  },
  methods: {
    ...mapActions(['getAllTemplates', 'removeTemplateById']),
    removeTemplate (id) {
      this.removeTemplateById(id)
    }
  },
  mounted () {
    this.getAllTemplates()
  }
}
</script>
<style>
.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .25s;
}

.fade-enter-active {
  transition-delay: .25s;
}

.fade-enter, .fade-leave-active {
  opacity: 0
}

.theme--light.v-application ::-webkit-scrollbar {
  width: 13px;
}

.theme--light.v-application ::-webkit-scrollbar-track {
  background: #e6e6e6;
  border-left: 1px solid #dadada;
}

.theme--light.v-application ::-webkit-scrollbar-thumb {
  background: #b0b0b0;
  border: solid 3px #e6e6e6;
  border-radius: 7px;
}

.theme--light.v-application ::-webkit-scrollbar-thumb:hover {
  background: black;
}

.theme--dark.v-application ::-webkit-scrollbar {
  width: 13px;
}

.theme--dark.v-application ::-webkit-scrollbar-track {
  background: #202020;
  border-left: 1px solid #2c2c2c;
}

.theme--dark.v-application ::-webkit-scrollbar-thumb {
  background: #3e3e3e;
  border: solid 3px #202020;
  border-radius: 7px;
}

.theme--dark.v-application ::-webkit-scrollbar-thumb:hover {
  background: white;
}
</style>
