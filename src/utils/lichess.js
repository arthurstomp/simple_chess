export default class Lichess {
  constructor() {
    this.clientId = process.env.REACT_APP_LICHESS_CLIENT_ID;
    this.redirectURL = process.env.REACT_APP_LICHESS_REDIRECT_URL;
  }

  authURL() {
    return `https://oauth.lichess.org/oauth/authorize?response_type=code&client_id=${this.clientId}&redirect_uri=${this.redirectURL}&scope=read`;
  }

  persistUserAccessToken(token) {}
}
