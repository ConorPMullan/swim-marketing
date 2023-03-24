import { renderHook } from "@testing-library/react-hooks";
import { useAuthState } from "./useAuthState";

describe("useAuthState", () => {
  it("should initialize state correctly", () => {
    const { result } = renderHook(() => useAuthState());
    expect(result.current.isAuthorized).toBeNull();
  });

  it("should set isAuthorized to true", () => {
    const { result } = renderHook(() => useAuthState());
    result.current.setIsAuthorized(true);
    expect(result.current.isAuthorized).toBe(true);
  });

  it("should set isAuthorized to false", () => {
    const { result } = renderHook(() => useAuthState());
    result.current.setIsAuthorized(false);
    expect(result.current.isAuthorized).toBe(false);
  });
});
