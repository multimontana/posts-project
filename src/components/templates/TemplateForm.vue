<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    max-width="800"
    class="edit-form"
  >
    <v-text-field
      v-model="template.Name"
      :counter="100"
      :rules="nameRules"
      label="Name"
      required
    ></v-text-field>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="save"
    >Save
    </v-btn>
  </v-form>
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
    ...mapGetters(['getSingleTemplate'])
  },
  methods: {
    ...mapActions(['getTemplateById', 'updateTemplate', 'saveTemplate']),
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
    }
  },
  mounted () {
    if (this.$route.params.id) {
      this.getTemplateById(this.$route.params.id).then((template) => {
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
