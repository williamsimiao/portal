<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <h2 class="heading">{{ $tc('home') }}</h2>
        </v-col>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" id="home_add_hsm" icon @click="showCrsModal = true">
              <v-icon>add</v-icon>
            </v-btn>
          </template>
          <span>{{ $tc('certificate_request') }} </span>
        </v-tooltip>
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
    <csr-modal
      :open="showCrsModal"
      @success="csrWithSuccess"
      @close="showCrsModal = false"
    />
  </div>
</template>

<script>
import CertCardView from '@/components/CertificateViews/CertificateCardView'
import CsrModal from './CsrModal'
export default {
  components: {
    CertCardView,
    CsrModal
  },
  data: () => ({
    showCrsModal: false,
    certificates: []
  }),
  created () {
    this.loadCertificates()
  },
  methods: {
    loadCertificates () {
      console.log('TODO')
      this.certificates = [
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
    },
    certRemovedWithSuccess () {
      this.loadCertificates()
    },
    csrWithSuccess () {
      this.showCrsModal = false
      this.$notify.success({})
    }
  }
}
</script>