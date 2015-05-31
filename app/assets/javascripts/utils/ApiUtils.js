import $ from 'jquery';
import ChangeCase from 'change-case';

const ApiUtils = {
  getSession(sessionToken, successCallback, errorCallback) {
    this.makeAjaxRequest(
      '/api/session/',
      'GET',
      {},
      { 'X-Session-Token': sessionToken },
      successCallback,
      errorCallback
    );
  },

  deleteSession(sessionToken, successCallback, errorCallback) {
    this.makeAjaxRequest(
      '/api/session/',
      'DELETE',
      {},
      { 'X-Session-Token': sessionToken },
      successCallback,
      errorCallback
    );
  },

  createUser(username, password, successCallback, errorCallback) {
    this.makeAjaxRequest(
      '/api/user/',
      'POST',
      { user: { username: username, password: password } },
      {},
      successCallback,
      errorCallback
    );
  },

  updateUser(data, sessionToken, successCallback, errorCallback) {
    this.makeAjaxRequest(
      '/api/user/',
      'PUT',
      { user: data },
      { 'X-Session-Token': sessionToken },
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
      errors: errors => {
        if (errorCallback) {
          errorCallback(
            this.convertObjToCase(errors.responseJSON, 'camelCase')
          );
        }
      }
    });
  },

  convertObjToCase(obj, casing) {
    let newObj = {};

    Object.keys(obj).forEach(key =>
      newObj[ChangeCase[casing](key)] =
        (Object.prototype.toString.call(obj[key]) === '[object Object]') ?
          this.convertObjToCase(obj[key], casing) : obj[key]
    );

    return newObj;
  }
};

export default ApiUtils;
