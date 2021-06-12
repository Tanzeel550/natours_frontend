import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import validator from 'validator';
import { startSendSignUpEmail, startSignUp } from '../../actions/authActions';
import { AppProps } from '../../store/configStore';

const mapStateToProps = ({ auth }: AppProps) => ({
  isAuthenticated: auth.isAuthenticated,
});
const connector = connect(mapStateToProps, {
  startSignUp,
  startSendSignUpEmail,
});
type propsFromRedux = ConnectedProps<typeof connector>;

export const SignUp = (props: propsFromRedux & RouteComponentProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const signUp = async (authToken: string) => {
      try {
        await props.startSignUp(authToken);

        await setTimeout(() => {}, 2000);
        props.history.push('/');
      } catch (e) {}
    };
    const { authToken } = props.match.params as { authToken: string };
    if (authToken) signUp(authToken).then().catch();
  }, [props]);

  const handleSignUpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (name === '') throw new Error('Name is required');
      if (email === '') throw new Error('Email is required');
      if (password === '') throw new Error('Password is required');
      if (confirmPassword === '')
        throw new Error('ConfirmPassword is required');
      if (password !== confirmPassword)
        throw new Error("Your passwords don't match");
      if (!validator.isEmail(email)) throw new Error('Your Email is incorrect');

      await props.startSendSignUpEmail(name, email, password, confirmPassword);

      setEmail('');
      setPassword('');
    } catch (e) {}
  };

  return (
    <main className="main">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Sign Up</h2>
        <form className="form" onSubmit={handleSignUpSubmit}>
          <div className="form__group">
            <label className="form__label" htmlFor="name">
              Name
            </label>
            <input
              className="form__input"
              id="name"
              type="text"
              name="name"
              placeholder="Jane Doe"
              required={true}
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <label className="form__label" htmlFor="email">
              Email address
            </label>
            <input
              className="form__input"
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              required={true}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="password">
              Password
            </label>
            <input
              className="form__input"
              id="password"
              type="password"
              placeholder="••••••••"
              required={true}
              minLength={8}
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <label className="form__label" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className="form__input"
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="••••••••"
            required={true}
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />

          <div className="form__group">
            <button className="btn btn--green">Sign Up</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default withRouter(connector(SignUp));
