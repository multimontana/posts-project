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
        <v-toolbar-title>Posts</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="$router.push({ name: 'post-form-add', params: { template: $route.params.id } })">
          <v-icon>mdi-card-plus</v-icon>
        </v-btn>
      </v-toolbar>
      <v-list three-line>
        <template v-for="(item, index) in getTemplatePosts">
          <v-divider
            :key="index"
            :inset="true"
          ></v-divider>
          <v-list-item
            :key="item.Name"
          >
            <v-list-item-content>
              <v-list-item-title v-text="item.Name"></v-list-item-title>
              <v-list-item-subtitle>Message <strong>{{ item.Text }}</strong></v-list-item-subtitle>
              <v-list-item-subtitle>Day <strong>{{ item.Day }}</strong></v-list-item-subtitle>
              <v-list-item-subtitle>Time <strong>{{ item.Time }}</strong></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click="remove(item.Id)">
                <v-icon color="grey lighten-1">mdi-delete</v-icon>
              </v-btn>
              <v-btn icon @click="$router.push({ name: 'post-form-edit', params: { post: item.Id, template: $route.params.id } })">
                <v-icon color="grey lighten-1">mdi-file-edit</v-icon>
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
  data: () => ({
    valid: true,
    template: {
      Name: '',
      Id: ''
    },
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 100) || 'Name must be less than 100 characters'
    ]
  }),
  computed: {
    ...mapGetters(['getTemplatePosts'])
  },
  methods: {
    ...mapActions(['getPostsByTemplateId', 'updatePost', 'deletePost', 'removePostById']),
    save () {
      if (this.$refs.form.validate()) {
        if (!this.template.Id) {
          this.saveTemplate({ Name: this.template.Name }).then(() => {
            this.$router.push('/')
          })
        } else {
          this.updateTemplate(this.template).then(() => {
            this.$router.push('/')
          })
        }
      }
    },
    remove (id) {
      this.removePostById(id)
    }
  },
  mounted () {
    if (this.$route.params.id) {
      this.getPostsByTemplateId(this.$route.params.id).then((template) => {
        this.template = template
      })
    }
  }
}
</script>

<style scoped>
.edit-form {
  width: 80%;
  margin: 0 auto;
  padding: 30px;
}
</style>
