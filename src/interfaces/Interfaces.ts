export interface QuestionInterface {
  question: string | null;
  correctAnswer: string | null;
  incorrectAnswers: string[] | null;
  allAnswers: string[] | null;
  selectedAnswer: string | null;
  computerPoints: number;
  playerPoints: number;
  answerSubmited: boolean;
  resultMessage: string | null;
}
