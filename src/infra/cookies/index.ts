import { setCookie, destroyCookie, parseCookies } from 'nookies';
import jwtDecode from 'jwt-decode';

abstract class Tokens {
  private readonly TOKEN_PATH;
  constructor(token_path: string) {
    this.TOKEN_PATH = token_path;
  }

  public async setToken(token: string) {
    setCookie(null, this.TOKEN_PATH, token, {
      path: '/',
      sameSite: 'lax'
    })
  }

  public getToken() {
    const cookies = parseCookies(null);
    return cookies[this.TOKEN_PATH];
  }

  public async removeToken() {
    destroyCookie(null, this.TOKEN_PATH)
  }
}

export class AccessToken extends Tokens {
  constructor() {
    super('sdfjiosdjfiosdjfiodjssdfs')
  }

  handleJWT(): {role: string} {
    return jwtDecode(this.getToken())
  }
}

export class RefreshToken extends Tokens {
  constructor() {
    super('uisahduyiasdfghdsiufh')
  }
}
