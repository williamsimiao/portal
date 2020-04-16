<template>
  <v-container>
    <v-row>
      <v-col :cols="cardColunmWidth" v-for="item in items" :key="item.subjectName">
        <cert-card
          @deletedd="$emit('deleted')"
          :item="item"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CertCard from '@/components/CertificateViews/CertificateCard'
export default {
  components: {
    CertCard
  },
  props: {
    items: {
      type: Array,
      required: true
    },
  },
  computed: {
    cardColunmWidth () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 12
        case 'sm':
        case 'lg':
        case 'md':
        default: return 12
      }
    }
  }
}
</script>
