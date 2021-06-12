import React from 'react';

const ErrorPage = () => (
  <main className="main">
    <div className="error">
      <div className="error__title">
        <h2 className="heading-secondary heading-secondary--error">
          Uh oh! Something went wrong!
        </h2>
        <h2 className="error__emoji">😢 🤯</h2>
      </div>
      <div className="error__msg">Sorry! This page does not exist</div>
      <h4>Please contact the developers.</h4>
    </div>
  </main>
);

export default ErrorPage;
