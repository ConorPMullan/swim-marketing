import jwt_decode from "jwt-decode";
import { axiosInstance, setBearerToken } from "../integration/Instance";
import { useAuthState } from "../stores/useAuthState";
import { useNavigate } from "react-router-dom";

interface IAccessToken {
  iat: number;
  exp: number;
  sub: number;
  roles: number;
}
interface IUseTokens {
  checkIfValidToken: (tokens: any) => Promise<void>;
  checkLocalStorageTokens: () => void;
  clearLocalStorageTokens: () => void;
}

const useTokens = (): IUseTokens => {
  console.log("use these tokens");
  const { setIsAuthorized } = useAuthState();
  const navigate = useNavigate();
  console.log("got here too these tokens");
  const checkIfValidToken = async (tokens: any) => {
    console.log("got here too checkIfValidToken");
    console.log("tokens", tokens);
    const decodedAccess = jwt_decode<IAccessToken>(tokens.accessToken);
    const decodedRefresh = jwt_decode<IAccessToken>(tokens.refreshToken);

    const accessTokenDate = new Date(decodedAccess.exp * 1000);
    const refreshTokenDate = new Date(decodedRefresh.exp * 1000);
    const nowDate = new Date();
    console.log("accessTokenDate", accessTokenDate);
    console.log("refreshTokenDate", refreshTokenDate);
    console.log("nowDate", nowDate);
    if (accessTokenDate > nowDate) {
      console.log("if one");
      localStorage.setItem("accessToken", tokens.accessToken);
      localStorage.setItem("refreshToken", tokens.refreshToken);
      console.log("SETTING BEARER TOKEN");
      setBearerToken(tokens.accessToken);
      setIsAuthorized(true);
    }
    if (accessTokenDate < nowDate && refreshTokenDate > nowDate) {
      console.log("two");
      const config = {
        headers: { Authorization: `Bearer ${tokens.refreshToken}` },
      };
      const resp = await axiosInstance.get("/api/authenticate/refresh", config);
      localStorage.setItem("accessToken", resp.data.accessToken);
      localStorage.setItem("refreshToken", resp.data.refreshToken);
      setIsAuthorized(true);
      navigate(0);
    }
    if (accessTokenDate < nowDate && refreshTokenDate < nowDate) {
      console.log("if three");
      setIsAuthorized(false);
    }
  };

  const checkLocalStorageTokens = () => {
    console.log("got here too checkLocalStorageTokens");
    const localStorageAccess = localStorage.getItem("accessToken");
    const localStorageRefresh = localStorage.getItem("refreshToken");
    if (localStorageAccess || localStorageRefresh) {
      checkIfValidToken({
        accessToken: localStorageAccess,
        refreshToken: localStorageRefresh,
      });
    } else {
      setIsAuthorized(false);
    }
  };

  const clearLocalStorageTokens = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsAuthorized(false);
    navigate("/login");
  };

  return {
    checkIfValidToken,
    checkLocalStorageTokens,
    clearLocalStorageTokens,
  };
};

export default useTokens;
