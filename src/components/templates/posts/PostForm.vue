<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    max-width="800"
    class="edit-form"
  >

    <v-text-field
      v-model="post.Text"
      :counter="10"
      :rules="messageRules"
      label="Message"
      required
    ></v-text-field>
    <v-img
      v-show="post.Image"
      max-height="150"
      max-width="250"
      :lazy-src="post.Image"
      :src="post.Image || ''"
    ></v-img>
    <v-file-input
      @change="changeFile"
      :rules="file_rules"
      accept="image/png, image/jpeg"
      placeholder="Pick an image"
      prepend-icon="mdi-camera"
      label="Avatar"
    ></v-file-input>
    <v-text-field
      v-model="post.Day"
      v-mask="'##'"
      :rules="dayRules"
      label="Day"
      required
    ></v-text-field>
    <v-text-field
      v-model="post.Time"
      v-mask="'##:##'"
      :rules="timeRules"
      label="Time"
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
import { mapActions } from 'vuex'

export default {
  data: () => ({
    valid: true,
    name: '',
    post: {
      Text: '',
      Day: '',
      Time: ''
    },
    file_rules: [
      value => !value || value.size < 4000000 || 'Avatar size should be less than 4 MB!'
    ],
    messageRules: [
      v => !!v || 'Message is required',
      v => (v && v.length <= 500) || 'Name must be less than 500 characters'
    ],
    dayRules: [
      v => !!v || 'Day is required',
      v => (v && v <= 31) || 'Day must be less than 31'
    ],
    timeRules: [
      v => !!v || 'Time is required',
      v => (v && v.length >= 5)
    ],
    checkbox: false
  }),
  methods: {
    ...mapActions(['getPostsById', 'savePost', 'updatePost', 'getSignedPolicy', 'uploadImage']),
    save () {
      if (this.$refs.form.validate()) {
        if (this.post.Id) {
          this.updatePost(this.post).then(() => {
            this.$router.back()
          })
        } else {
          this.savePost({ ...this.post, template_id: this.$route.params.template }).then(() => {
            this.$router.back()
          })
        }
      }
    },
    async changeFile (file) {
      try {
        const policy = await this.getSignedPolicy()
        const { name, type } = file
        const formData = new FormData()
        const fileName = `UserImages/104/Templates/${name}`
        file = new Blob([file], { type })
        formData.append('key', fileName)
        formData.append('fileName', fileName)
        formData.append('AWSAccessKeyId', policy.AccessKeyId)
        formData.append('acl', 'public-read')
        formData.append('Content-Type', type)
        formData.append('signature', policy.Signature)
        formData.append('policy', policy.Policy)
        formData.append('file', file)
        this.post.Image = process.env.VUE_APP_AWS_S3_URL + fileName
        await fetch(process.env.VUE_APP_AWS_S3_URL, {
          method: 'POST',
          body: formData
        })
      } catch (e) {
        console.log(e)
      }
    }
  },
  mounted () {
    if (this.$route.params.post) {
      this.getPostsById(this.$route.params.post).then((post) => {
        this.post = post
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
