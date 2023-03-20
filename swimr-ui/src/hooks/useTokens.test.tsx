import { renderHook } from "@testing-library/react-hooks";
import axios from "axios";
import { useAuthState } from "../stores/useAuthState";
import { useNavigate } from "react-router-dom";
import useTokens from "./useTokens";
import { QueryClient, QueryClientProvider } from "react-query";
import { cleanup, waitFor } from "@testing-library/react";
import jwtDecode from "jwt-decode";
jest.mock("jwt-decode", () => jest.fn());
jest.mock("../stores/useAuthState");
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("useTokens", () => {
  let setIsAuthorized: jest.Mock;
  let navigate: jest.Mock;
  let hook: any;

  beforeEach(() => {
    setIsAuthorized = jest.fn();
    (useAuthState as unknown as jest.Mock).mockReturnValue({ setIsAuthorized });
    navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);

    // hook = renderHook(() => useTokens());
  });

  afterEach(() => {
    cleanup();
  });

  describe("checkIfValidToken", () => {
    it("sets tokens and isAuthorized if access token is valid", async () => {
      const queryClient = new QueryClient();
      (jwtDecode as jest.Mock).mockImplementation(() => ({ exp: 12345 }));
      const wrapper = ({ children }: { children: any }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      );

      hook = renderHook(() => useTokens(), {
        wrapper,
      });
      const tokens = {
        accessToken: "valid-access-token",
        refreshToken: "valid-refresh-token",
      };
      const decodedAccess = {
        exp: Date.now() + 100000,
      };

      jest.spyOn(global.Date, "now").mockImplementation(() => 0);

      const setBearerToken = jest.fn();

      jest.spyOn(localStorage, "setItem");

      hook.result.current.checkIfValidToken(tokens);

      await waitFor(() => {
        expect(setBearerToken).toHaveBeenCalledWith("valid-access-token");
        expect(setIsAuthorized).toHaveBeenCalledWith(true);
        expect(localStorage.setItem).toHaveBeenCalledWith(
          "accessToken",
          "valid-access-token"
        );
        expect(localStorage.setItem).toHaveBeenCalledWith(
          "refreshToken",
          "valid-refresh-token"
        );
      });
    });

    it("sets new tokens and isAuthorized if access token is expired and refresh token is valid", async () => {
      const queryClient = new QueryClient();
      (jwtDecode as jest.Mock).mockImplementation(() => ({ exp: 12345 }));
      const wrapper = ({ children }: { children: any }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      );

      hook = renderHook(() => useTokens(), {
        wrapper,
      });
      const tokens = {
        accessToken: "expired-access-token",
        refreshToken: "valid-refresh-token",
      };
      const decodedAccess = {
        exp: Date.now() - 100000,
      };
      const decodedRefresh = {
        exp: Date.now() + 100000,
      };

      jest.spyOn(global.Date, "now").mockImplementation(() => 0);

      jest.spyOn(localStorage, "setItem");

      hook.result.current.checkIfValidToken(tokens);

      await waitFor(() => {
        expect(setIsAuthorized).toHaveBeenCalledWith(false);
        expect(localStorage.setItem).toHaveBeenCalledWith(
          "accessToken",
          "new-access-token"
        );
        expect(localStorage.setItem).toHaveBeenCalledWith(
          "refreshToken",
          "new-refresh-token"
        );
        expect(navigate).toHaveBeenCalledWith(0);
      });
    });
  });
});
