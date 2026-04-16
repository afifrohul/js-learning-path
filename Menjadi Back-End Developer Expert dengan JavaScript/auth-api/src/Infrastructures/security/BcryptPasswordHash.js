import PasswordHash from "../../Applications/security/PasswordHash.js";

class BcryptPasswordHash extends PasswordHash {
  constructor(bcrypt, saltRound = 10) {
    super();
    this._bcrypt = bcrypt;
    this._saltRound = saltRound;
  }

  async hash(password) {
    return this._bcrypt.hash(password, this._saltRound);
  }

  async compare(password, hashedPassword) {
    return this._bcrypt.compare(password, hashedPassword);
  }
}

export default BcryptPasswordHash;
