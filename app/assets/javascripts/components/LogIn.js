import React from 'react';
import UserActions from 'actions/UserActions';

class LogIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }

  render() {
    return(
      <div className="LogIn">
        <h3>Log In</h3>
        <form>
          <input type="text"
            placeholder="username"
            value={ this.state.username }
            onChange={ this._generateInputChangeHandler('username') }/>
          <input type="password"
            placeholder="password"
            value={ this.state.password }
            onChange={ this._generateInputChangeHandler('password') }/>
          <button onClick={ this._onSubmit() }>Log In</button>
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

  _onSubmit() {
    const boundFn = event => {
      event.preventDefault();
      UserActions.attemptLogIn(
        this.state.username,
        this.state.password
      );
    }

    return boundFn;
  }
}

export default LogIn;
