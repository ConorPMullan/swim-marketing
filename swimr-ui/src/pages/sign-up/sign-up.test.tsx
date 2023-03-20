import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Router } from "react-router-dom";
import SignUp from ".";
import TestUtils from "../../test-utils";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock("../../hooks/useCreateUser", () => ({
  __esModule: true,
  default: () => ({ mutate: jest.fn() }),
}));
jest.mock("../../hooks/useTokens", () => ({
  __esModule: true,
  default: () => ({ checkIfValidToken: jest.fn() }),
}));
jest.mock("react-hot-toast", () => ({
  __esModule: true,
  Toaster: () => null,
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));
jest.mock("formik", () => ({
  __esModule: true,
  useFormik: jest.fn().mockReturnValue({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    handleSubmit: jest.fn(),
    handleChange: jest.fn(),
    handleBlur: jest.fn(),
    values: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    errors: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    touched: {},
    isSubmitting: false,
  }),
}));
jest.mock("yup", () => ({
  __esModule: true,
  object: () => ({
    shape: () => ({
      required: () => ({
        email: () => ({
          oneOf: () => ({
            required: () => null,
          }),
          required: () => null,
        }),
        required: () => null,
      }),
      oneOf: () => ({
        required: () => null,
      }),
    }),
  }),
  string: () => ({
    required: () => jest.fn(),
    email: () => ({
      required: () => jest.fn(),
    }),
    oneOf: () => ({
      required: () => null,
    }),
  }),
  ref: () => jest.fn(),
}));

describe("SignUp", () => {
  it("renders the page heading", () => {
    render(<SignUp />);
    expect(screen.getByTestId("signup-page-heading")).toHaveTextContent(
      "Sign Up"
    );
  });

  it("renders the name input field", () => {
    render(<SignUp />);
    expect(screen.getByTestId("signup-name-field")).toBeInTheDocument();
  });

  it("renders the email input field", () => {
    render(<SignUp />);
    expect(screen.getByTestId("signup-email-field")).toBeInTheDocument();
  });

  it("renders the password input field", () => {
    render(<SignUp />);
    expect(screen.getByTestId("signup-password-field")).toBeInTheDocument();
  });

  it("renders the confirm password input field", () => {
    render(<SignUp />);
    expect(
      screen.getByTestId("signup-confirm-password-field")
    ).toBeInTheDocument();
  });

  it("renders the sign up button", () => {
    render(<SignUp />);
    expect(
      screen.getByRole("button", { name: /Sign Up/i })
    ).toBeInTheDocument();
  });

  //   it("submits the form when the sign up button is clicked", async () => {
  //     TestUtils.render(<SignUp />);

  //     const nameField = screen.getByTestId("signup-name-field");
  //     const emailField = screen.getByTestId("signup-email-field");
  //     const passwordField = screen;
  //   });
});
