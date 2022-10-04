export default class Lecture {
    pk: string;
    quarter_pk: string;
    lesson: any;

  constructor(pk: string, quarter_pk: string, lesson: any) {
    this.pk = pk
    this.quarter_pk = quarter_pk
    this.lesson = lesson
  }

}