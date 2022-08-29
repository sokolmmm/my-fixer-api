export default class Base64 {
  static getExtension(base64: string) {
    const ext = base64.match(/[^:/]\w+(?=;|,)/)[0];

    return ext;
  }

  static getBody(base64: string) {
    const body = base64.replace(/^data:image\/\w+;base64,/, '');

    return body;
  }

  static getData(base64: string) {
    const base64Body = this.getBody(base64);

    const base64Data = Buffer.from(Buffer.from(base64Body, 'base64'));

    return base64Data;
  }
}
