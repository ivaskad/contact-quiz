<template>
  <div id="quiz">
    <div class="d-flex justify-content-center">
      <div
        class="card"
        style="width: 25rem;"
      >
        <div class="card-header">
          <p class="h4">
            {{ question }}
          </p>
        </div>
        <div class="card-body">
          <div
            class="row"
          >
            <div
              v-for="(result, index) in resultsList()"
              :key="index"
              class="result col-6"
            >
              <button
                class="btn btn-primary m-2"
                style="width: 10rem;"
                @click="answer(result)"
              >
                {{ result }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal
      :name="'quiz_answer'"
      :class="userAnswer === null ? '' : answerIsCorrect() ? 'bg-success' : 'bg-danger'"
    >
      <template
        v-slot:title
      >
        <p class="h4">
          Výsledek
        </p>
      </template>
      <div
        v-if="userAnswer"
        class="text-center"
      >
        <p class="h5">
          {{ userAnswer }}!!
        </p>
        <div>Odpověděli jste {{ answerIsCorrect() ? 'Správně' : 'Špatně' }}</div>
        <div v-if="!answerIsCorrect()">
          Správná odpověď je {{ correctAnswer() }}
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import { EventBus } from '../event-bus'
import Modal from '../Components/Modal.vue'

const RANDOM_MIN = 0
const RANDOM_MAX = 20
const OPERATIONS = [
  {
    text: '+',
    function: function (a, b) {
      return a + b
    }
  },
  {
    text: '-',
    function: function (a, b) {
      return a - b
    }
  },
  {
    text: '*',
    function: function (a, b) {
      return a * b
    }
  }
]

export default {
  name: 'Quiz',
  components: {
    Modal
  },
  data: function () {
    return {
      a: 0,
      b: 0,
      operation: {
        text: '+',
        function: function (a, b) {
          return a + b
        }
      },
      userAnswer: null
    }
  },
  computed: {
    question: function () {
      return `Kolik je ${this.a} ${this.operation.text} ${this.b}`
    }
  },
  mounted: function () {
    let self = this
    EventBus.$on('modalClosed', function (modalName) {
      if (modalName === 'quiz_answer') {
        self.reset()
      }
    })
    this.reset()
  },
  methods: {
    answer: function (answer) {
      if (this.userAnswer === null) {
        EventBus.$emit('showModal', 'quiz_answer')
        this.userAnswer = answer
      }
    },
    correctAnswer: function () {
      return this.operation.function(this.a, this.b)
    },
    answerIsCorrect: function () {
      if (this.userAnswer === null) return false
      return this.correctAnswer() === this.userAnswer
    },
    resultsList: function () {
      let correct = this.correctAnswer()
      let resultsList = [correct]
      while (resultsList.length !== 4) {
        let max = correct + 4
        let min = correct - 4
        let random = Math.floor(Math.random() * (max - min + 1)) + min
        if (resultsList.indexOf(random) === -1) {
          resultsList.push(random)
        }
      }
      return resultsList.sort(function (a, b) {
        return a - b
      })
    },
    randomNumber: function () {
      return Math.floor(Math.random() * (RANDOM_MAX - RANDOM_MIN + 1)) + RANDOM_MIN
    },
    randomOperation: function () {
      return OPERATIONS[Math.floor(Math.random() * OPERATIONS.length)]
    },
    reset: function () {
      this.$set(this, 'a', this.randomNumber())
      this.$set(this, 'b', this.randomNumber())
      this.$set(this, 'operation', this.randomOperation())
      this.userAnswer = null
    }
  }
}
</script>

<style scoped>

</style>
