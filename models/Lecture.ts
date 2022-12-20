export default class Lecture {
  pk: string;
  quarter_pk: string;
  lesson: any;
  path: string;
  video: any;

  constructor(
    pk: string,
    quarter_pk: string,
    lesson: any,
    path: string,
    video: any,
  ) {
    this.pk = pk
    this.quarter_pk = quarter_pk
    this.lesson = lesson
    this.path = path
    this.video = video
  }


}