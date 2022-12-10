export default class Enumeration {
  pk: string;
  activity_pk: string;
  answer: string;
  question?: string;
  direction?: string;
  question_image?: any;
  question_video?: any;

  constructor(
    pk: string,
    activity_pk: string,
    answer: string,
    question?: string,
    direction?: string,
    question_image?: any,
    question_video?: any,
  ) {
    this.pk = pk
    this.activity_pk = activity_pk
    this.question = question
    this.answer = answer
    this.question_image = question_image
    this.direction = direction
    this.question_video = question_video
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