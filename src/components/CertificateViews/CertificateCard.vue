<template>
  <v-row>
    <v-col>
      <v-hover v-slot:default="{ hover }">
        <v-card

          :elevation="hover ? 5 : 2"
          :class="{ 'on-hover': hover }"
          color="dinamo"
        >
          <v-card-text>
            <v-row no-gutters class="pa-2 py-0">
              <v-col>
                <v-row class="py-2">
                  <v-col>
                    <h2>{{ item.subjectName }}</h2>
                  </v-col>
                </v-row>
                <v-row class="py-2 pl-4">
                  <strong>{{ `${$tc('validity_interval')}` }}</strong>
                </v-row>
                <v-row class="pl-6">
                  <strong>{{ `${$tc('from')}` + ": " }}</strong>
                  <p>{{ item.notBefore }}</p>
                </v-row>
                <v-row class="pl-6">
                  <strong>{{ `${$tc('to')}` + ": " }}</strong>
                  <p>{{ item.notAfter }}</p>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon @click="deleteCert">
              <v-icon>delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-hover>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
  },
  methods: {
    deleteCert () {
      console.log('cert deleted')
      // const body = {
      // }
      // this.$store.dispatch('', body)
      //   .then(() => {
      //     this.$emit('deleted')
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
    }
  }
}
</script>
