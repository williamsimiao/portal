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
        <strong>{{ user.name }}</strong>
        <v-row>
          <v-col>
            <v-icon>person</v-icon>
            {{ user.name }}
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
  data: () => ({
    dialog: false
  }),
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
      console.log(this.user)
      this.dialog = val
    }
  }
  
}