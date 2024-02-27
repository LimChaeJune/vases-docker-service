import React from 'react';

const SignIn = () => {
  return (
    <div className="sign-in-container">
      <form>
        <h1>Sign In</h1>
        <div className="social-links">
          <div>
            <a href="#">
              <i className="fa fa-facebook" aria-hidden="true"></i>
            </a>
          </div>
          <div>
            <a href="#">
              <i className="fa fa-twitter" aria-hidden="true"></i>
            </a>
          </div>
          <div>
            <a href="#">
              <i className="fa fa-linkedin" aria-hidden="true"></i>
            </a>
          </div>
        </div>
        <span>or use your account</span>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button className="form_btn">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
