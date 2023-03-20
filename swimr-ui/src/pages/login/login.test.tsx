import React from "react";
import { fireEvent, waitFor, screen } from "@testing-library/react";
import Login from ".";
import TestUtils from "../../test-utils";
import useAuth from "../../hooks/useAuth";

jest.mock("../../hooks/useAuth");
const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Login Component", () => {
  it("renders without crashing", () => {
    (useAuth as jest.Mock).mockReturnValue({
      mutate: jest.fn().mockResolvedValue({ status: 200 }),
    });
    TestUtils.render(<Login />);
    expect(screen.getByTestId("login-page")).toBeInTheDocument();
  });

  it("submits the form when the Sign In button is clicked", async () => {
    (useAuth as jest.Mock).mockReturnValue({
      mutate: jest.fn().mockResolvedValue({ status: 200 }),
    });
    TestUtils.render(<Login />);
    const signInButton = screen.getByTestId("sign-in-btn") as HTMLInputElement;
    const emailInput = screen.getByTestId(
      "email-login-field"
    ) as HTMLInputElement;
    const passwordInput = screen.getByTestId(
      "password-login-field"
    ) as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: "testemail@mail.com" } });
    expect(emailInput.value).toEqual("testemail@mail.com");
    fireEvent.change(passwordInput, { target: { value: "testpassword123!" } });
    expect(passwordInput.value).toEqual("testpassword123!");
    fireEvent.click(signInButton);

    await waitFor(() => expect(useAuth).toHaveBeenCalled());
  });

  it("sign up button opens new page", async () => {
    (useAuth as jest.Mock).mockReturnValue({
      mutate: jest.fn().mockResolvedValue({ status: 200 }),
    });
    TestUtils.render(<Login />);
    const signUpButton = screen.getByTestId("sign-up-link") as HTMLInputElement;
    fireEvent.click(signUpButton);

    await waitFor(() => expect(mockedUsedNavigate).toHaveBeenCalled());
  });
});
