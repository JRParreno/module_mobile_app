export default class Lecture {
    pk: string;
    quarter_pk: string;
  lesson: any;
  path: string;

  constructor(
    pk: string, 
    quarter_pk: string, 
    lesson: any, 
    path: string
) {
    this.pk = pk
    this.quarter_pk = quarter_pk
    this.lesson = lesson
    this.path = path
  }


}