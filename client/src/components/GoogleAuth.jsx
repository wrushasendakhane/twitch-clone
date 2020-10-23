import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { trySignIn, trySignOut } from "../redux/actions/authActions";

function GoogleAuth({ tryLogIn, tryLogOut, loggedIn }) {
  const [auth, setAuth] = useState(null);
  const initClient = () => {
    window.gapi.client
      .init({
        clientId: `${process.env.REACT_APP_GOOGLE_OAUTH_KEY}`,
        scope: "email",
      })
      .then(() => {
        setAuth(window.gapi.auth2.getAuthInstance());
        onAuthChange(window.gapi.auth2.getAuthInstance().isSignedIn.get());
        window.gapi.auth2.getAuthInstance().isSignedIn.listen(onAuthChange);
      });
  };

  const onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      tryLogIn(window.gapi.auth2.getAuthInstance().currentUser.get().getId());
    } else {
      tryLogOut();
    }
  };

  useEffect(() => {
    window.gapi.load("client:auth2", initClient);
  }, []);

  const onSignInClick = () => {
    try {
      auth.signIn();
    } catch (error) {
      console.log(error);
    }
  };

  const onSignOutClick = () => {
    try {
      auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Fragment>
      {loggedIn ? (
        <button
          className="medium ui google red button"
          onClick={onSignOutClick}
        >
          <i className="google  icon"></i>
          Sign Out
        </button>
      ) : (
        <button className="medium ui google red button" onClick={onSignInClick}>
          <i className="google  icon"></i>
          Sign In with Google
        </button>
      )}
    </Fragment>
  );
}

const mapStateToProps = ({ auth }) => ({
  loggedIn: auth.isSignedIn,
});

const mapDispatchToProps = (dispatch) => ({
  tryLogIn: (loggedIn, id) => dispatch(trySignIn(loggedIn, id)),
  tryLogOut: () => dispatch(trySignOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GoogleAuth);
