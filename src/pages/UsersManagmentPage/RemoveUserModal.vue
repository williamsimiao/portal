<template>
  <v-dialog v-model="dialog" max-width="350px">
    <v-card>
      <v-card-title>
        {{ $tc('remove_user') }}
        <v-spacer></v-spacer>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn icon @click="closeModal()" v-on="on">
              <v-icon>close</v-icon>
            </v-btn>
          </template>
          <span>{{ $tc('close') }} </span>
        </v-tooltip>
      </v-card-title>
      <v-card-text>
        {{ $t('remove') }}
        <strong>{{ `${user.name} ?` }}</strong>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text color="red darken-1" @click="removeUser">
          {{ $t('remove') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  props: {
    open: {
      type: Boolean,
      required: true,
      default: false
    },
    user: {
      type: Object,
      required: true,
      default: () => ({ name: undefined })
    }
  },
  data () {
    return {
      dialog: this.open
    }
  },
  methods: {
    closeModal () {
      this.$emit('close')
    },
    removeUser () {
      console.log(`removed ${this.user.name}`)
    }
  },
  watch: {
    open (val) {
      this.dialog = val
    }
  }
}
</script>