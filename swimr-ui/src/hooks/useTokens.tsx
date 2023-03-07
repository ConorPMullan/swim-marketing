import jwt_decode from "jwt-decode";
import { axiosInstance, setBearerToken } from "../integration/Instance";
import { IAccessToken } from "../interfaces/tokens";
import { useAuthState } from "../stores/useAuthState";
import { useNavigate } from "react-router-dom";

interface IUseTokens {
  checkIfValidToken: (tokens: any) => Promise<void>;
  checkLocalStorageTokens: () => void;
  clearLocalStorageTokens: () => void;
}

const useTokens = (): IUseTokens => {
  const { setIsAuthorized } = useAuthState();
  const navigate = useNavigate();

  const checkIfValidToken = async (tokens: any) => {
    const decodedAccess = jwt_decode<IAccessToken>(tokens.accessToken);
    const decodedRefresh = jwt_decode<IAccessToken>(tokens.refreshToken);
    const accessTokenDate = new Date(decodedAccess.exp * 1000);
    const refreshTokenDate = new Date(decodedRefresh.exp * 1000);
    const nowDate = new Date();

    if (accessTokenDate > nowDate) {
      localStorage.setItem("accessToken", tokens.accessToken);
      localStorage.setItem("refreshToken", tokens.refreshToken);
      setBearerToken(tokens.accessToken);
      setIsAuthorized(true);
    }
    if (accessTokenDate < nowDate && refreshTokenDate > nowDate) {
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
      setIsAuthorized(false);
    }
  };

  const checkLocalStorageTokens = () => {
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
