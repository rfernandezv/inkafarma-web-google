export class messageNotification {
  title: string;
  body: string;

  constructor() {}

  public setTitle(value: string): messageNotification {
    this.title = value;
    return this;
  }
  public setBody(value: string): messageNotification {
    this.body = value;
    return this;
  }

}
