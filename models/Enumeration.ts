export default class Enumeration {
    pk: string;
    activity_pk: string;
    question: string;
    answer: string;

  constructor(
    pk: string, 
    activity_pk: string, 
    question: string, 
    answer: string
) {
    this.pk = pk
    this.activity_pk = activity_pk
    this.question = question
    this.answer = answer
  }
}

export class EnumAnswer {
  activity_pk: string;
  enum_pk: string;
  answer: string;
  is_correct?: boolean;

  constructor(
    activity_pk: string, 
    enum_pk: string, 
    answer: string, 
    is_correct?: boolean
) {
    this.activity_pk = activity_pk
    this.enum_pk = enum_pk
    this.answer = answer
    this.is_correct = is_correct
  }

}