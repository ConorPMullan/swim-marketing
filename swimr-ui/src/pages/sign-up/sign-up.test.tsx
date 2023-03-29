import { screen } from "@testing-library/react";
import SignUp from ".";
import TestUtils from "../../test-utils";
const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
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
    TestUtils.render(<SignUp />);
    expect(screen.getByTestId("signup-page-heading")).toHaveTextContent(
      "Sign Up"
    );
  });

  it("renders the name input field", () => {
    TestUtils.render(<SignUp />);
    expect(screen.getByTestId("signup-name-field")).toBeInTheDocument();
  });

  it("renders the email input field", () => {
    TestUtils.render(<SignUp />);
    expect(screen.getByTestId("signup-email-field")).toBeInTheDocument();
  });

  it("renders the password input field", () => {
    TestUtils.render(<SignUp />);
    expect(screen.getByTestId("signup-password-field")).toBeInTheDocument();
  });

  it("renders the confirm password input field", () => {
    TestUtils.render(<SignUp />);
    expect(
      screen.getByTestId("signup-confirm-password-field")
    ).toBeInTheDocument();
  });

  it("renders the sign up button", () => {
    TestUtils.render(<SignUp />);
    expect(
      screen.getByRole("button", { name: /Sign Up/i })
    ).toBeInTheDocument();
  });
});
