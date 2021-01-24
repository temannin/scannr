export default class ScannerAPI {
  constructor(token, base_url) {
    this.token = token;
    this.base_url = base_url;
  }

  static initialize(api_version) {
    const API_VERSION = api_version;
    const base_url = `/api/v${API_VERSION}/`;

    return fetch(base_url + "token")
      .then((resp) => resp.json())
      .then((data) => new this(data.token, base_url));
  }

  getSessionToken() {
    return this.token;
  }

  scan(params) {
    return fetch(this.base_url + "scan", {
      method: "POST",
      headers: { token: this.token },
      body: JSON.stringify(params),
    }).then((response) => response.json());
  }
}
