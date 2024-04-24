import React from "react";
import SignInDialog from "../../components/login-register/SignInDialog";

function LoginPage() {
  return <SignInDialog open={true} fromGettingStartedPage={false} />;
}

export default LoginPage;
