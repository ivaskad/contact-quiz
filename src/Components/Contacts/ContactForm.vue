<template>
  <div class="d-block">
    <form @submit.prevent="addContact()">
      <div v-if="showTitle">
        <p class="lead text-secondary">
          {{ action }} Kontakt
        </p>
      </div>
      <div class="list-group text-secondary mb-3">
        <div class="col form-group">
          <label for="name">
            Jméno
          </label>
          <input
            id="name"
            v-model="currentContact.name"
            type="text"
            class="form-control"
            :class="submitted && !nameIsValid ? 'is-invalid' : ''"
            placeholder="Dominik Ivaška"
            @keyup.enter.prevent="addContact()"
          >
          <div class="invalid-feedback">
            Prosím zadejte jméno
          </div>
        </div>

        <div class="form-group col">
          <label for="email">
            Email
          </label>
          <input
            id="email"
            v-model="currentContact.email"
            type="email"
            class="form-control"
            :class="submitted && !emailIsValid ? 'is-invalid' : ''"
            placeholder="ivaskad@gmail.com"
            @keyup.enter.prevent="addContact()"
          >
          <div class="invalid-feedback">
            Prosím zadejte platný email
          </div>
        </div>

        <div class="col form-group">
          <label for="phone">
            Telefon
          </label>
          <input
            id="phone"
            v-model="currentContact.phone"
            type="text"
            class="form-control"
            :class="submitted && !phoneIsValid ? 'is-invalid' : ''"
            placeholder="Dominik Ivaška"
            @keyup.enter.prevent="addContact()"
          >
        </div>

        <div class="text-right clearfix">
          <div
            v-if="edit === false && showButtons"
            class="col form-group"
          >
            <button
              type="button"
              class="btn"
              :class="{'btn-success': formIsValid}"
              @click="addContact()"
            >
              <i class="fa fa-save" /> Přidat
            </button>
          </div>
          <div
            v-else-if="showButtons"
            class="col form-group"
          >
            <button
              type="button"
              class="btn"
              @click="updateContact()"
            >
              <i class="fa fa-edit" /> Uložit změny
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { EventBus } from '../../event-bus'

export default {
  name: 'ContactForm',
  props: {
    edit: {
      type: Boolean,
      default: false
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    showButtons: {
      type: Boolean,
      default: true
    }
  },
  data: function () {
    return {
      submitted: false,
      currentContact: {
        id: null,
        name: '',
        email: '',
        phone: ''
      },
      rules: {
        // name: '^.+\\ .+', //jmeno + prijmeni
        name: '^.+',
        email: '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
        phone: '^[ 0-9+]*'
      }
    }
  },
  computed: {
    action: function () {
      return this.edit ? 'Upravit' : 'Vytvořit'
    },
    nameIsValid: function () {
      return this.testField('name')
    },
    emailIsValid: function () {
      return this.testField('email')
    },
    phoneIsValid: function () {
      return this.testField('phone')
    },
    formIsValid: function () {
      return this.nameIsValid &&
                this.emailIsValid &&
              this.phoneIsValid
    }
  },
  watch: {
    contact: function () {
      if (this.contact === null) {
        this.resetForm()
      }
    }
  },
  mounted: function () {
    let self = this
    if (self.edit) {
      EventBus.$on('selectContact', function (contact) {
        self.currentContact = Object.assign(self.currentContact, contact)
      })
      EventBus.$on('updateContactRequest', function () {
        self.updateContact()
      })
    }
  },
  methods: {
    testField: function (field) {
      return new RegExp(this.rules[field]).test(String(this.currentContact[field]))
    },
    addContact: function () {
      this.submitted = true
      if (this.formIsValid) {
        EventBus.$emit('addContact', this.currentContact)
        this.resetForm()
      } else {
        console.log('form is not valid')
      }
    },
    updateContact: function () {
      this.submitted = true
      if (this.formIsValid) {
        EventBus.$emit('updateContact', this.currentContact)
        this.resetForm()
      } else {
        console.log('form is not valid')
      }
    },
    resetForm: function () {
      this.submitted = false
      this.currentContact = {
        id: null,
        name: '',
        email: '',
        phone: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
