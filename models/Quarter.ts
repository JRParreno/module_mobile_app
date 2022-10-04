export default class Quarter {
    pk: string;
    title: string;
    direction: string;

  constructor(pk: string, title: string, direction: string) {
    this.pk = pk
    this.title = title
    this.direction = direction
  }
}