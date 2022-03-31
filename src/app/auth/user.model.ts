export class User {
  constructor(public email: string, public localId: string, private _idToken: string, private _expiresIn: Date){}

  get token() {
    if(!this._expiresIn || new Date() > this._expiresIn) {
      return null
    }

    return this._idToken
  }
}