import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { startLogin, startSendLoginEmail } from '../../actions/authActions';
import { exitLoading, simulateLoading } from '../../actions/loadingActions';
import { AppProps } from '../../store/configStore';
import { simulateErrorAlert, simulateSuccessAlert } from '../../actions/alertActions';
import { RouteComponentProps, withRouter } from 'react-router-dom';

const mapStateToProps = ({ auth }: AppProps) => ({ isAuthenticated: auth.isAuthenticated });

const connector = connect(mapStateToProps, {
  startLogin, simulateErrorAlert, simulateSuccessAlert, simulateLoading, exitLoading, startSendLoginEmail
});
type propsFromRedux = ConnectedProps<typeof connector>

export const Login = (props: propsFromRedux & RouteComponentProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const login = async (authToken: string) => {
      try {
        props.simulateLoading();
        await props.startLogin(authToken);
        props.exitLoading();

        props.simulateSuccessAlert('You have logged In successfully');
        await setTimeout(() => {
        }, 2000);
        props.history.push('/');
      } catch (e) {
        props.exitLoading();
        props.simulateErrorAlert(e.message);
      }
    };
    const { authToken } = props.match.params as { authToken: string };
    if (authToken) login(authToken).then().catch();
  }, [props]);

  useEffect(() => {
    let search: URLSearchParams = new URLSearchParams(props.location.search);
    if (props.isAuthenticated && search.get('from')) props.history.push(search.get('from')!!);
  }, [props]);

  const handleLoginSubmit = async (e:React.FormEvent<HTMLFormElement>):Promise<void> => {
    e.preventDefault();
    try {
      await props.startSendLoginEmail(email, password);
      setEmail('');
      setPassword('');
    } catch (e) {}
  };

  return (
    <main className="main">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>
        <form className="form" onSubmit={handleLoginSubmit}>
          <div className="form__group">
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
          <div className="form__group">
            <button className="btn btn--green">
              Login
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default withRouter(connector(Login));
