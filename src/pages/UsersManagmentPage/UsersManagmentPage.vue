<template>
  <v-container>
    <v-row justify="space-between" no-gutters>
      <h2 class="heading">{{ $tc('users_managment') }}</h2>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon @click="showInviteMemberModal = true">
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
      :items="allMembers"
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
              @click="removeUser(item)"
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
    <!-- <member-invite-modal/> -->
    <!-- <member-remove-modal
      organizationName="Limoeiro"
      :name="selectedItem"
      :open="showRemoveMemberModal"
      @close="closeRemoveMemberModal"
      @success="memberRemovedWithSuccess"
    />
    <member-role-modal
      organizationName="Limoeiro"
      :name="selectedItem"
      :open="showRoleModal"
      @close="closeRoleModal"
      @success="roleEditedWithSuccess"
    />
    <member-invite-modal
      organizationName="Limoeiro"
      :open="showInviteMemberModal"
      @close="closeInviteMemberModal"
      @success="roleEditedWithSuccess"
    /> -->
  </v-container>
</template>
<script>
// import MemberRemoveModal from './MembersDataTableModals/MemberRemoveModal'
// import MemberRoleModal from './MembersDataTableModals/MemberRoleModal'
// import MemberInviteModal from './MembersDataTableModals/MemberInviteModal'

export default {
  // components: {
  //   MemberRemoveModal,
  //   MemberRoleModal,
  //   MemberInviteModal
  // },
  created () {
    this.initialize()
  },
  data () {
    return {
      search: null,
      selectedItem: null,
      showInviteMemberModal: false,
      showRemoveMemberModal: false,
      showRoleModal: false,
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
      allMembers: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        protein: 0,
      },
      defaultItem: {
        name: '',
        protein: 0,
      },
    }
  },
  methods: {
    initialize () {
      this.allMembers = [
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
    removeUser (user) {
      console.log(`delete user: ${user.name}`)
    },

    // ADD
    closeInviteMemberModal () {
      this.showInviteMemberModal = false
      this.selectedItem = null
    },
    memberInvitedWithSuccess () {
      this.closeInviteMemberModal()
    },
    // REMOVE
    removeMember (memberName) {
      this.selectedItem = memberName
      this.showRemoveMemberModal = true
    },
    closeRemoveMemberModal () {
      this.showRemoveMemberModal = false
      this.selectedItem = null
    },
    memberRemovedWithSuccess () {
      this.closeRemoveMemberModal()
    },
    // EDIT ROLE
    editMemberRole (memberName) {
      this.selectedItem = memberName
      this.showRoleModal = true
    },
    closeRoleModal () {
      this.showRoleModal = false
      this.selectedItem = null
    },
    roleEditedWithSuccess () {
      this.closeRoleModal()
    }
  }
}
</script>