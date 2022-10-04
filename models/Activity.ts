export default class Activity {
    pk: string;
    quarter_pk: string;
    title: string;
    direction: string;
    story: any;

  constructor(
    pk: string, 
    quarter_pk: string, 
    title: string, 
    direction: string, 
    story: any
) {
    this.pk = pk
    this.quarter_pk = quarter_pk
    this.title = title
    this.direction = direction
    this.story = story
  }

}