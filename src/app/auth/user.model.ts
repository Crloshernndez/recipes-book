export class User {
  constructor(
    public email: string,
    public userId: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  // creamos un getten para antes de poder obtener el token verificar su validez
  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}
