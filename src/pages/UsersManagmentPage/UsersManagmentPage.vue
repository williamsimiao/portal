<template>
  <v-container>
    <v-row justify="space-between" no-gutters>
      <h2 class="heading">{{ $tc('users_managment') }}</h2>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon @click="showAddUserModal = true">
            <v-icon>
              add
            </v-icon>
          </v-btn>
        </template>
        <span>{{ $tc('add_member') }} </span>
      </v-tooltip>
    </v-row>
    <v-divider/>
    <v-row no-gutters align="end">
      <v-text-field
        class="mb-4"
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      >
      </v-text-field>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="users"
      sort-by="calories"
      class="elevation-1"
      hide-default-header
      :search="search"
    >
      <template v-slot:item.action="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              v-on="on"
              icon
              @click="openRemoveUserModal(item)"
            >
              <v-icon>delete</v-icon>
            </v-btn>
          </template>
          <span>{{ `${$tc('remove_user')}` }}</span>
        </v-tooltip>
      </template>
      <template v-slot:no-data>
        <td
          :colspan="headers.length"
          class="text-xs-center"
          v-if="false"
        >
          {{ $t('searching') }}
        </td>

        <td
          :colspan="headers.length"
          class="text-xs-center"
          v-else
        >
          {{ $t('$vuetify.noDataText') }}
        </td>
      </template>
    </v-data-table>
    <add-user-modal
      :open="showAddUserModal"
      @close="showAddUserModal = false"
      @success="userAddedWithSuccess()"
    />
    <remove-user-modal
      :open="showRemoveUserModal"
      :user="selectedItem"
      @close="closeRemoveUserModal()"
      @success="userRemovedWithSuccess()"
    />
  </v-container>
</template>
<script>
import RemoveUserModal from './RemoveUserModal'
import AddUserModal from './AddUserModal'
export default {
  components: {
    RemoveUserModal,
    AddUserModal
  },
  created () {
    this.initialize()
  },
  data () {
    return {
      search: null,
      selectedItem: null,
      showAddUserModal: false,
      showRemoveUserModal: false,
      item: 0,
      headers: [
        {
          text: this.$tc('name'),
          align: 'left',
          sortable: true,
          value: 'name',
        },
        { text: this.$tc('actions'), align: 'right', value: 'action', sortable: false },
      ],
      users: [],
    }
  },
  methods: {
    initialize () {
      this.users = [
        {
          name: 'Meridith',
        },
        {
          name: 'Sloan',
        },
        {
          name: 'Shepard',
        }
      ]
    },
    // ADD
    userAddedWithSuccess () {
      this.showAddUserModal = false
    },
    // REMOVE
    openRemoveUserModal (user) {
      this.selectedItem = user
      this.showRemoveUserModal = true
    },
    closeRemoveUserModal () {
      this.showRemoveUserModal = false
      this.selectedItem = null
    },
    userRemovedWithSuccess () {
      this.closeRemoveUserModal()
    },
  }
}
</script>