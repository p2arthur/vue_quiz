<!-- @format -->

//---------------------------------------------------------------------------
<script lang="ts">
  import Scoreboard from './components/Scoreboard.vue';
  import { QuestionInterface } from './interfaces/Interfaces';
  const url =
    'https://opentdb.com/api.php?amount=1&category=18&difficulty=medium';

  export default {
    name: 'App',
    data(): QuestionInterface {
      return {
        question: null,
        correctAnswer: null,
        incorrectAnswers: null,
        allAnswers: null,
        selectedAnswer: null,
        computerPoints: 0,
        playerPoints: 0,
        answerSubmited: false,
        resultMessage: null,
      };
    },

    //This is a hook that executes things on the first render
    async created() {
      const { data } = await this.axios.get(url);
      console.log(data);
      const { correct_answer, incorrect_answers, question, category } =
        data.results[0];
      this.question = question;
      this.correctAnswer = correct_answer;
      this.incorrectAnswers = incorrect_answers;
    },

    //Using computed properties to set the data of all answers
    computed: {
      answers() {
        const answers = JSON.parse(JSON.stringify(this.incorrectAnswers!));
        const randomNumber = Math.round(Math.random() * answers?.length);
        console.log('random', randomNumber);

        answers?.splice(randomNumber, 0, this.correctAnswer);

        console.log(answers);

        return answers;
      },
    },

    methods: {
      async resetQuestions() {
        this.question = null;
        this.correctAnswer = null;
        this.selectedAnswer = null;
        this.incorrectAnswers = null;
        const { data } = await this.axios.get(url);
        const { correct_answer, incorrect_answers, question, category } =
          data.results[0];
        this.question = question;
        this.correctAnswer = correct_answer;
        this.incorrectAnswers = incorrect_answers;
        this.answerSubmited = false;
      },

      async submitAnswer() {
        if (!this.selectedAnswer) {
          alert('Please select an answer');
          this.answerSubmited = false;
          return;
        }

        this.answerSubmited = true;

        const correctAnswer = this.selectedAnswer == this.correctAnswer;

        correctAnswer
          ? (this.playerPoints = this.playerPoints + 1) &&
            (this.resultMessage = `Correct answer ✅ The correct answer is ${this.correctAnswer}`)
          : (this.computerPoints = this.computerPoints + 1) &&
            (this.resultMessage = `Wrong answer ❌ The correct answer is ${this.correctAnswer}`);

        setTimeout(async () => {
          await this.resetQuestions();
        }, 2000);
      },
    },

    components: { Scoreboard },
  };
</script>

//------------------------------------------------------------

<template>
  <div>
    <scoreboard
      :playerPoints="this.playerPoints"
      :computerPoints="this.computerPoints" />

    <template v-if="this.question">
      <h2 v-html="this.question" />

      <template
        v-for="(answer, index) in answers"
        :key="index">
        <form>
          <input
            :disabled="this.answerSubmited"
            type="radio"
            :id="'option' + index"
            :value="answer"
            v-model="this.selectedAnswer" />
          <label
            for="'option' + index"
            v-html="answer" /><br />
        </form>
      </template>
      <template v-if="answerSubmited">
        <div class="message">{{ this.resultMessage }}</div>
        <p>Loading next question...</p>
      </template>

      <button
        v-if="!this.answerSubmited"
        @click="this.submitAnswer"
        class="send">
        Submit
      </button></template
    >
  </div>
</template>
//----------------------------------------------------------
<style lang="scss">
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 60px auto;
    max-width: 560px;

    h1 {
      margin-top: 40px;
    }

    input[type='radio'] {
      margin: 12px 4px;
    }

    button.send {
      margin-top: 12px;
      height: 40px;
      min-width: 120px;
      padding: 0 16px;
      color: #fff;
      background-color: #1867c0;
      border: 1px solid #1867c0;
      cursor: pointer;
    }

    section.score {
      border-bottom: 1px solid black;
      padding: 24px;
      font-size: 18px;
      span {
        padding: 8px;
        font-weight: bold;
        border: 1px solid black;
      }
    }
  }
</style>
