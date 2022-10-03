export default class Answer {
    categroy_pk: string;
    question_pk: string;
    answer: string;
    is_correct: boolean;

  constructor(
    categroy_pk: string, 
    question_pk: string, 
    answer: string, 
    is_correct: boolean
) {
    this.categroy_pk = categroy_pk
    this.question_pk = question_pk
    this.answer = answer
    this.is_correct = is_correct
  }

}