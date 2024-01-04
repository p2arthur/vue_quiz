export interface QuestionInterface {
  question: string | null;
  correctAnswer: string | null;
  incorrectAnswers: string[] | null;
  allAnswers: string[] | null;
}
