<template>
  <div class="col-sm-6 col-md-4">
    <div class="contact card mb-3">
      <div class="card-actions absolute pr-3 pt-2">
        <a
          href="#"
          alt="Edit"
          class="pl-2"
          @click.prevent="selectContactForUpdate"
        >
          <i class="fa fa-pencil" />
        </a>
        <a
          href="#"
          alt="Edit"
          class="pl-2"
          @click.prevent="trashContact"
        >
          <i class="fa fa-trash" />
        </a>
      </div>
      <div class="card-header bg-transparent border-0 pl-3 pr-3 pb-0 bg-white">
        <p class="h4">
          {{ contact .name }}
        </p>
      </div>
      <div class="card-body border-0 p-3">
        <div class="email">
          {{ contact.email }}
        </div>
        <div class="phone">
          {{ contact.phone }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from '../../event-bus'

export default {
  name: 'Contact',
  props: {
    contact: {
      type: Object,
      default: function () {
        return {
          name: {
            type: String,
            default: ''
          },
          email: {
            type: String,
            default: ''
          },
          phone: {
            type: String,
            default: ''
          }
        }
      }
    }
  },
  methods: {
    selectContactForUpdate: function () {
      EventBus.$emit('showModal', 'edit_contact')
      EventBus.$emit('selectContact', this.contact)
    },
    trashContact: function () {
      EventBus.$emit('showModal', 'trash_contact')
      EventBus.$emit('selectContact', this.contact)
    }
  }
}
</script>

<style scoped>

</style>
