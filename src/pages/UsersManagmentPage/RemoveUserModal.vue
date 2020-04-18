<template>
  <v-dialog v-model="dialog">
    <v-card>
      <v-card-title>
        {{ $tc('add_user') }}
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
        {{ $t('member_removal_warning') }}
        <strong>{{ }}</strong>
        <v-row>
          <v-col>
            <v-icon>person</v-icon>
            {{  }}
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text color="red darken-1" @click.native="removeUser">
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
      required: false,
      default: false
    },
    user: {
      type: Object,
      required: true
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