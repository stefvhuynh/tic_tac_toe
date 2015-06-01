import React from 'react';
import UserActions from 'actions/UserActions';

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }

  render() {
    return(
      <div className="SignUp user-form">
        <h3>Sign Up</h3>
        <form>
          <input type="text"
            placeholder="username"
            value={ this.state.username }
            onChange={ this._generateInputChangeHandler('username') }/>
          <input type="password"
            placeholder="password"
            value={ this.state.password }
            onChange={ this._generateInputChangeHandler('password') }/>
          <button onClick={ this._onSubmit() }>Sign Up</button>
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
      UserActions.attemptSignUp(
        this.state.username,
        this.state.password
      );
    }

    return boundFn;
  }
}

export default SignUp;
