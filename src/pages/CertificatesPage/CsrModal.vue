<template>
  <v-dialog v-model="dialog" @click:outside="closeModal" persistent scrollable max-width="600px">
    <v-card>
      <v-card-title>
        {{ $tc('certificate_request') }}
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
        <v-form @submit.prevent="submit">
          <v-text-field
            :label="$tc('common_name')"
            v-model="commomName"
            :error-messages="commomNameErrors"
            @input="onCNSelected"
            @blur="$v.commomName.$touch()"
          />

          
          <v-text-field
            :label="$tc('organization')"
            v-model="organization"
            :error-messages="organizationErrors"
            @input="$v.organization.$touch()"
            @blur="$v.organization.$touch()"
          />
          

          <template v-for="(orgUnit, index) in organizationUnitArray">
            <v-text-field
              :key="`orgUnit-${index}`"
              :label="organizationUnitLabel(index)"
              v-model="organizationUnitArray[index]"
              :error-messages="organizationUnitErrors"
              @input="$v.organizationUnit.$touch()"
              @blur="$v.organizationUnit.$touch()"
              :append-outer-icon="index === 0 ? 'add' : 'remove'"
              @click:append-outer="addRemoveItem(index)"
            />
          </template>
          

          
          <!-- <v-text-field
            :label="$tc('locality')"
            v-model="locality"
            :error-messages="localityErrors"
            @input="$v.locality.$touch()"
            @blur="$v.locality.$touch()"
          />
          

          
          <v-text-field
            :label="$tc('state_label')"
            v-model="stateValue"
            :error-messages="stateValueErrors"
            @input="$v.stateValue.$touch()"
            @blur="$v.stateValue.$touch()"
          />
          

          
          <v-text-field
            :label="$tc('country')"
            v-model="country"
            :error-messages="countryErrors"
            @input="$v.country.$touch()"
            @blur="$v.country.$touch()"
          /> -->
          

          
          <v-text-field
            label="Email (E)"
            v-model="email"
          />
          

          
          <!-- <v-spacer />
          <center>
            <strong>{{ $t('or') }}</strong>
          </center>
          <v-spacer />
          <v-textarea
            auto-grow
            row="1"
            row-height="15"
            v-model="distiguishName"
            :error-messages="distiguishNameErrors"
            @input="onDNSelected()"
            @blur="$v.distiguishName.$touch()"
            :label="$tc('distiguish_name')"
          /> -->
          
          <v-row no-gutters justify="end">
            <v-btn
              dark
              type="submit"
              color="green darken-1"
            >
              {{ $tc('send') }}
            </v-btn>
          </v-row>
          
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
export default {
  props: {
    open: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data () {
    return {
      dialog: this.open,
      isUsingDN: false,
      email: null,
      commomName: null,
      organizationUnitArray: [''],
      organization: null,
      stateValue: null,
      locality: null,
      country: null,
      distiguishName: null,
    }
  },
  computed: {
    // ERRORS
    commomNameErrors () {
      const errors = []
      if (!this.$v.commomName.$dirty) return errors
      !this.$v.commomName.required &&
        errors.push(this.$t('$validation.required'))
      return errors
    },
    organizationErrors () {
      const errors = []
      if (!this.$v.organization.$dirty) return errors
      !this.$v.organization.validAlphaNumeric &&
        errors.push(this.$t('$validation.invalid_alpha_numeric'))
      return errors
    },
    organizationUnitErrors () {
      const errors = []
      if (!this.$v.organizationUnit.$dirty) return errors
      !this.$v.organizationUnit.validAlphaNumeric &&
        errors.push(this.$t('$validation.invalid_alpha_numeric'))
      return errors
    },
    localityErrors () {
      const errors = []
      if (!this.$v.locality.$dirty) return errors
      !this.$v.locality.validAlphaNumeric &&
        errors.push(this.$t('$validation.invalid_alpha_numeric'))
      return errors
    },
    stateValueErrors () {
      const errors = []
      if (!this.$v.stateValue.$dirty) return errors
      !this.$v.stateValue.validAlphaNumeric &&
        errors.push(this.$t('$validation.invalid_alpha_numeric'))
      return errors
    },
    countryErrors () {
      const errors = []
      !this.$v.country.maxLength &&
        errors.push(
          this.$t('$validation.max_length', {
            num: this.$v.country.$params.maxLength.max
          })
        )
      !this.$v.country.minLength &&
        errors.push(
          this.$t('$validation.min_length', {
            num: this.$v.country.$params.minLength.max
          })
        )
      return errors
    },
    // shaValueErrors () {
    //   const errors = []
    //   if (!this.$v.shaValue.$dirty) return errors
    //   !this.$v.shaValue.required &&
    //     errors.push(this.$t('$validation.required'))
    //   return errors
    // },
    distiguishNameErrors () {
      const errors = []
      if (!this.$v.distiguishName.$dirty) return errors
      !this.$v.distiguishName.required &&
        errors.push(this.$t('$validation.required'))
      return errors
    }
  },
  methods: {
    organizationUnitLabel (index) {
      var label = `${this.$tc('organization_unit')}`
      if (index > 0) label += `-${index +1}`
      return label
    },
    addRemoveItem (index) {
      if (index === 0) {
        this.organizationUnitArray.push('')
      } else {
        this.organizationUnitArray.splice(index, 1)
      }
    },
    closeModal () {
      this.$emit('close')
    },
    clearForm () {
      this.isUsingDN = false
      this.distiguishName = null
      this.commomName = null
      this.organization = null
      this.organizationUnitArray = ['']
      this.locality = null
      this.stateValue = null
      this.country = null
      this.email = null
      this.$v.$reset()
    },
    mountDNfromFields () {
      console.log(this.organizationUnitArray)
      var dn = ''
      if (this.email) dn += '/E=' + this.email
      if (this.commomName) dn += '/CN=' + this.commomName
      for (let organizationUnit of this.organizationUnitArray) {
        dn += '/OU=' + organizationUnit
      }
      if (this.organization) dn += '/O=' + this.organization
      if (this.stateValue) dn += '/ST=' + this.stateValue
      if (this.locality) dn += '/L=' + this.locality
      if (this.country) dn += '/C=' + this.country
      return dn
    },
    onCNSelected () {
      this.$v.$reset()
      this.$v.commomName.$touch()
      this.isUsingDN = false
      this.distiguishName = null
    },
    onDNSelected () {
      this.$v.$reset()
      this.$v.distiguishName.$touch()
      this.isUsingDN = true
      this.commomName = null
      this.organization = null
      this.organizationUnitArray = ['']
      this.locality = null
      this.stateValue = null
      this.country = null
      this.email = null
    },
    submit () {
      const myDN = this.distiguishName !== null ? this.distiguishName : this.mountDNfromFields()
      console.log(`myDN: ${myDN}`)
      // const body = {
      //   // obj: this.thename,
      //   // hash: this.shaValue,
      //   dn: myDN
      // }
      // this.$store.dispatch('cert/doCertRequest', body)
      //   .then(() => {
      //     this.$emit('success')
      //   })
      //   .catch(err => {
      //     this.$notify.error(err)
      //   })
    }
  },
  validations () {
    const validation = {}
    const validAlphaNumeric = value => {
      if (!value) return true
      let numbeOfValidChars = (value.match(/[A-Za-z0-9]/g) || []).length
      return !(value.length - numbeOfValidChars > 0)
    }
    if (this.isUsingDN) {
        validation.distiguishName = {
          required
        }
        validation.commomName = {}
      } else {
        validation.distiguishName = {}
        validation.commomName = {
          required
        }
      }
      validation.country = {
        maxLength: maxLength(2),
        minLength: minLength(2)
      }
      validation.organization = {
        validAlphaNumeric
      }
      validation.organizationUnit = {
        validAlphaNumeric
      }
      validation.locality = {
        validAlphaNumeric
      }
      validation.stateValue = {
        validAlphaNumeric
      }
    return validation
  },
  watch: {
    open (val) {
      this.dialog = val
      if (!val) {
        this.clearForm()
      }
    }
  }
}
</script>