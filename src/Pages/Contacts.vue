<template>
  <div id="contacts">
    <div class="d-flex justify-content-center">
      <contact-form
        style="width: 25rem;"
      />
    </div>
    <hr>
    <div class="row">
      <contact
        v-for="(contact, index) in contacts"
        :key="index"
        :contact="contact"
      />
    </div>
    <modal
      :name="'edit_contact'"
    >
      <template
        v-slot:title
        class="row"
      >
        <p class="h3">
          Upravit kontakt
        </p>
      </template>
      <contact-form
        :edit="true"
        :show-title="false"
        :show-buttons="false"
      />
      <template
        v-slot:footer
      >
        <button
          type="button"
          class="btn"
          @click="updateContactRequest()"
        >
          <i class="fa fa-edit" /> Uložit změny
        </button>
      </template>
    </modal>
    <modal
      :name="'trash_contact'"
    >
      <template
        v-slot:title
        class="row"
      >
        <p class="h3">
          Smazat kontakt
        </p>
      </template>
      Opravdu si přejete smazat kontakt?
      <template
        v-slot:footer
      >
        <button
          type="button"
          class="btn"
          @click="trashContact(selectedContact)"
        >
          <i class="fa fa-trash" /> Smazat
        </button>
      </template>
    </modal>
  </div>
</template>

<script>
import { EventBus } from '../event-bus'

import ContactForm from '../Components/Contacts/ContactForm.vue'
import Contact from '../Components/Contacts/Contact.vue'
import Modal from '../Components/Modal.vue'

export default {
  name: 'Contacts',
  components: {
    ContactForm, Contact, Modal
  },
  data: function () {
    return {
      contacts: [
        { id: 0, name: 'Dominik Ivaška', email: 'ivaskad@gmail.com', phone: '776105557' },
        { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '776123456' },
        { id: 2, name: 'Foo Bar', email: 'foo@bar.foobar', phone: '123456789' }
      ],
      lastContactId: 2,
      selectedContact: null
    }
  },
  mounted: function () {
    let self = this
    EventBus.$on('addContact', function (contact) {
      self.addContact(contact)
    })
    EventBus.$on('updateContact', function (contact) {
      self.updateContact(contact)
    })
    EventBus.$on('selectContact', function (contact) {
      self.selectedContact = contact
    })
  },
  methods: {
    addContact: function (contact) {
      contact.id = ++this.lastContactId
      this.contacts.push(contact)
    },
    updateContactRequest: function () {
      EventBus.$emit('updateContactRequest')
    },
    updateContact: function (contact) {
      this.contacts = this.contacts.map(function (item) {
        if (item.id === contact.id) {
          item = contact
        }
        return item
      })
      EventBus.$emit('hideModal', 'edit_contact')
    },
    trashContact: function (contact) {
      this.contacts = this.contacts.filter(function (item) {
        if (item.id !== contact.id) {
          return item
        }
      })
      EventBus.$emit('hideModal', 'trash_contact')
    }
  }
}
</script>

<style scoped>

</style>
