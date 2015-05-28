import $ from 'jquery';
import ChangeCase from 'change-case';

const ApiUtils = {
  createUser(username, password, successCallback, errorCallback) {
    this.makeAjaxRequest(
      '/api/users/',
      'POST',
      { user: { username: username, password: password } },
      {},
      successCallback,
      errorCallback
    );
  },

  createSession(username, password, successCallback, errorCallback) {
    this.makeAjaxRequest(
      '/api/session/',
      'POST',
      { credentials: { username: username, password: password } },
      {},
      successCallback,
      errorCallback
    );
  },

  makeAjaxRequest(url, method, data, headers, successCallback, errorCallback) {
    $.ajax({
      url: url,
      method: method,
      data: this.convertObjToCase(data, 'snakeCase'),
      headers: headers,
      success: response => {
        if (successCallback) {
          successCallback(this.convertObjToCase(response, 'camelCase'));
        }
      },
      error: error => {
        if (errorCallback) {
          errorCallback(this.convertObjToCase(error.responseJSON, 'camelCase'));
        }
      }
    });
  },

  convertObjToCase(obj, casing) {
    let newObj = {};

    Object.keys(obj).forEach(key =>
      newObj[ChangeCase[casing](key)] =
        (typeof obj[key] === 'object') ?
          this.convertObjToCase(obj[key], casing) : obj[key]
    );

    return newObj;
  }
};

export default ApiUtils;
