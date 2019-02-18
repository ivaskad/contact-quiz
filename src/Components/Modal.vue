<template>
  <div
    :ref="modalId"
    class="modal fade"
    tabindex="-1"
    role="dialog"
  >
    <div
      class="modal-dialog"
      style="width: 25rem;"
      role="document"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            <slot name="title" />
          </h5>
          <button
            type="button"
            class="close"
            aria-label="Close"
            @click="closeModal"
          >
            <span aria-hidden="true">
              &times;
            </span>
          </button>
        </div>
        <div class="modal-body">
          <slot>Modal body text goes here.</slot>
        </div>
        <div class="modal-footer">
          <slot name="footer" />
          <button
            type="button"
            class="btn btn-secondary"
            @click="closeModal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from '../event-bus'

export default {
  name: 'Modal',
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  computed: {
    modalId: function () {
      return 'modal_' + this.name
    },
    elementRef: function () {
      return this.$refs[this.modalId]
    }
  },
  mounted: function () {
    let self = this
    EventBus.$on('showModal', function (modalName) {
      if (self.name === modalName) {
        self.show()
      }
    })
    EventBus.$on('hideModal', function (modalName) {
      if (self.name === modalName) {
        self.hide()
      }
    })
    window.jQuery(this.elementRef).on('hidden.bs.modal', function (e) {
      EventBus.$emit('modalClosed', self.name)
    })
    window.jQuery(this.elementRef).on('shown.bs.modal', function (e) {
      EventBus.$emit('modalOpened', self.name)
    })
  },
  methods: {
    show: function () {
      window.jQuery(this.elementRef).modal('show')
    },
    hide: function () {
      window.jQuery(this.elementRef).modal('hide')
    },
    closeModal: function () {
      this.hide()
    }
  }
}
</script>

<style scoped>

</style>
