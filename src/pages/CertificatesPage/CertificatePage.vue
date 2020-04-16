<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <h2 class="heading">{{ $tc('home') }}</h2>
        </v-col>
      </v-row>
      <v-divider/>
      <v-row>
        <v-col>
          <cert-card-view
            :items="certificates"
            @deleted="certRemovedWithSuccess"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import CertCardView from '@/components/CertificateViews/CertificateCardView'
export default {
  components: {
    CertCardView,
  },
  data: () => ({
    certificates: [
      {
        subjectName: 'Meredith Grey - ortopedista',
        notBefore: new Date(),
        notAfter: new Date()
      },
      {
        subjectName: 'Meredith Grey - cirurgiã',
        notBefore: new Date(),
        notAfter: new Date()
      }
    ]
  }),
  created () {
    this.loadCertificates()
  },
  methods: {
    loadCertificates () {
      console.log('TODO')
    },
    certRemovedWithSuccess () {
      this.loadCertificates()
    }
  }
}
</script>