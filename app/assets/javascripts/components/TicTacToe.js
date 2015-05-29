import React from 'react';
import UserActions from 'actions/UserActions';

class TicTacToe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newUsername: '',
      newPassword: '',
      existingUsername: '',
      existingPassword: ''
    };
  }

  render() {
    return(
      <div className="TicTacToe">
        <h1>TicTacToe</h1>

        <h3>Log In</h3>
        <form>
          <input type="text"
            placeholder="username"
            value={ this.state.existingUsername }
            onChange={ this._generateInputChangeHandler('existingUsername') }/>
          <input type="password"
            placeholder="password"
            value={ this.state.existingPassword }
            onChange={ this._generateInputChangeHandler('existingPassword') }/>
          <button onClick={ this._onLogInSubmit() }>Log In</button>
        </form>

        <h3>Sign Up</h3>
        <form>
          <input type="text"
            placeholder="username"
            value={ this.state.newUsername }
            onChange={ this._generateInputChangeHandler('newUsername') }/>
          <input type="password"
            placeholder="password"
            value={ this.state.newPassword }
            onChange={ this._generateInputChangeHandler('newPassword') }/>
          <button onClick={ this._onSignUpSubmit() }>Sign Up</button>
        </form>
      </div>
    );
  }

  _generateInputChangeHandler(stateKey) {
    const handler = event => {
      event.preventDefault();
      this.setState({ [stateKey]: event.target.value });
    };

    return handler;
  }

  _onSignUpSubmit() {
    const boundFn = event => {
      event.preventDefault();
      UserActions.attemptSignUp(this.state.newUsername, this.state.newPassword);
    }

    return boundFn;
  }

  _onLogInSubmit() {
    const boundFn = event => {
      event.preventDefault();
      UserActions.attemptLogIn(
        this.state.existingUsername,
        this.state.existingPassword
      );
    }

    return boundFn;
  }
}

export default TicTacToe;
