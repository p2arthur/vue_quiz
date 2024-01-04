<!-- @format -->

<template>
  <div>
    <template v-if="this.question">
      <h2 v-html="this.question" />

      <template
        v-for="(answer, index) in answers"
        :key="index">
        <input
          id="answer"
          type="radio"
          value="answer" />
        <label
          for="answer"
          v-html="answer" /><br />
      </template>
      <button
        @click="submitAnswer"
        class="send">
        Submit
      </button></template
    >
  </div>
</template>
//---------------------------------------------------------------------------
<script lang="ts">
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
      submitAnswer(answer: string) {
        console.log(answer);
      },
    },

    components: {},
  };
</script>
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
