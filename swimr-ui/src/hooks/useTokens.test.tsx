import { renderHook } from "@testing-library/react-hooks";
import useTokens from "./useTokens";
import { QueryClient, QueryClientProvider } from "react-query";
import { useAuthState } from "../stores/useAuthState";
import { waitFor } from "@testing-library/react";

const mockedUsedNavigate = jest.fn();
const mockedSetAuthorized = jest.fn();
const nowDate = new Date();
const mockedAccessDate = new Date(nowDate);
const mockedRefreshDate = new Date(nowDate);
mockedAccessDate.setDate(nowDate.getDate() + 1);
mockedRefreshDate.setDate(nowDate.getDate() + 2);

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock("../stores/useAuthState.tsx");

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: any }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
describe("useTokens", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();

    const mockUseAuthState = useAuthState as jest.MockedFunction<
      typeof useAuthState
    >;
    mockUseAuthState.mockReturnValue({
      isAuthorized: true,
      setIsAuthorized: mockedSetAuthorized,
    });
  });

  it("should check localStorage tokens and set authorized state to true if valid", async () => {
    const { result } = renderHook(() => useTokens(), {
      wrapper,
    });
    const tokens = {
      accessToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3Nzk3Mzg4NzR9.3s_YSJeJWUr4CJhaf_POe5M7_QoOGm7LoHOzU78Y-Q0",
      refreshToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Nzk4MjE2NzR9.M3y3VopigONJEmudanNKnE6n6XvsDV0TQlNCJx39lAE",
    };
    localStorage.setItem("accessToken", tokens.accessToken);
    localStorage.setItem("refreshToken", tokens.refreshToken);

    await result.current.checkLocalStorageTokens();

    await waitFor(() => {
      expect(mockedSetAuthorized).toHaveBeenCalledWith(true);
    });
  });

  it("should check localStorage tokens and check refresh token if access is outdated", async () => {
    const { result } = renderHook(() => useTokens(), {
      wrapper,
    });
    const tokens = {
      accessToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Nzk1NjYzMDV9.dFSwxZ5YGcBetO_ZJ4UXa8IC14Hx9KqC---Y02zu7kA",
      refreshToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3Nzk4MjE2NzR9.0Vi51My7sOafigLtGSCorapYggVM22dRFn2RagTGokQ",
    };
    localStorage.setItem("accessToken", tokens.accessToken);
    localStorage.setItem("refreshToken", tokens.refreshToken);

    await result.current.checkLocalStorageTokens();

    await waitFor(() => {
      expect(mockedSetAuthorized).toHaveBeenCalledWith(true);
      expect(mockedUsedNavigate).toHaveBeenCalledWith(0);
    });
  });
  it("should check localStorage tokens and setauthorized false if access and refresh are outdated", async () => {
    const { result } = renderHook(() => useTokens(), {
      wrapper,
    });
    const tokens = {
      accessToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Nzk1NjYzMDV9.dFSwxZ5YGcBetO_ZJ4UXa8IC14Hx9KqC---Y02zu7kA",
      refreshToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Nzk1NjYzMDV9.dFSwxZ5YGcBetO_ZJ4UXa8IC14Hx9KqC---Y02zu7kA",
    };
    localStorage.setItem("accessToken", tokens.accessToken);
    localStorage.setItem("refreshToken", tokens.refreshToken);

    await result.current.checkLocalStorageTokens();

    await waitFor(() => {
      expect(mockedSetAuthorized).toHaveBeenCalledWith(false);
    });
  });

  it("empty/invalid tokens", async () => {
    const { result } = renderHook(() => useTokens(), {
      wrapper,
    });

    await result.current.checkLocalStorageTokens();

    await waitFor(() => {
      expect(mockedSetAuthorized).toHaveBeenCalledWith(false);
    });
  });

  it("clear local storage", async () => {
    const { result } = renderHook(() => useTokens(), {
      wrapper,
    });

    await result.current.clearLocalStorageTokens();

    await waitFor(() => {
      expect(mockedSetAuthorized).toHaveBeenCalledWith(false);
      expect(mockedUsedNavigate).toHaveBeenCalledWith("/login");
      expect(localStorage.getItem("accessToken")).toBe(null);
      expect(localStorage.getItem("refreshToken")).toBe(null);
    });
  });
});
