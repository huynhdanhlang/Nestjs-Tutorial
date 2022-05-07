import React from "react";
import GoogleLogin from "react-google-login";
import useGoogleAuthentication from "./useGoogleAuthentication";

function GoogleButton() {
  const clientId = process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID;

  const { handleSuccess } = useGoogleAuthentication();

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Log in"
      onSuccess={handleSuccess}
      onFailure={(error) => {
        console.log(["error"], error);
      }}
    />
  );
}

export default GoogleButton;
