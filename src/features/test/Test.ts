interface Test {
    id: string;
    title: string;
    questions: Question[];
  }

  interface Question {
    title: string;
    answers: Answer[]
  }

  interface Answer {
    title: string;
  }

  export type {Test, Question, Answer};
