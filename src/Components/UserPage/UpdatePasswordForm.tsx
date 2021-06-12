import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { startUpdatePassword } from '../../actions/authActions';
import { exitLoading, simulateLoading } from '../../actions/loadingActions';

const connector = connect(null, {
  simulateLoading,
  exitLoading,
  startUpdatePassword,
});
type propsFromRedux = ConnectedProps<typeof connector>;

const UpdatePassword = (props: propsFromRedux) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword)
        throw new Error("Your passwords don't match");

      await props.startUpdatePassword(
        currentPassword,
        password,
        confirmPassword
      );

      setCurrentPassword('');
      setPassword('');
      setConfirmPassword('');
    } catch (e) {}
  };

  return (
    <div className="user-view__form-container">
      <h2 className="heading-secondary ma-bt-md">Password change</h2>
      <form className="form form-user-settings" onSubmit={handleSubmit}>
        <div className="form__group">
          <label className="form__label" htmlFor="password-current">
            Current password
          </label>
          <input
            className="form__input"
            id="password-current"
            type="password"
            placeholder="••••••••"
            required={true}
            minLength={8}
            name="currentPassword"
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
          />
        </div>
        <div className="form__group">
          <label className="form__label" htmlFor="password">
            New password
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
        <div className="form__group ma-bt-lg">
          <label className="form__label" htmlFor="password-confirm">
            Confirm password
          </label>
          <input
            className="form__input"
            id="password-confirm"
            type="password"
            placeholder="••••••••"
            required={true}
            minLength={8}
            name="confirmPassword"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="form__group right">
          <button className="btn btn--small btn--green">Save password</button>
        </div>
      </form>
    </div>
  );
};

export default connector(UpdatePassword);
