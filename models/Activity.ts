export default class Activity {
    pk: string;
    lesson_pk: string;
    title: string;
    direction: string;
    story: any;

  constructor(
    pk: string, 
    lesson_pk: string, 
    title: string, 
    direction: string, 
    story: any
) {
    this.pk = pk
    this.lesson_pk = lesson_pk
    this.title = title
    this.direction = direction
    this.story = story
  }

}