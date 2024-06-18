import useAuthenticationState from "../../data/GlobalStates/AuthenticationState";
import AuthrenticationPage from "./AuthenticationPage";

const AuthenticationValidation = ({ children }: any) => {
  const isLogin = useAuthenticationState((state: any) => state.isLogin);

  if (!isLogin) {
    return <AuthrenticationPage />;
  }

  return <>{children}</>;
};

export default AuthenticationValidation;
