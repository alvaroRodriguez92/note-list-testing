import Register from "./Register";
import { render, fireEvent, screen } from "@testing-library/react";
import { beforeEach, test, describe, expect } from "@jest/globals";

let componentRegister;

beforeEach(() => {
  componentRegister = render(<Register />);
});

describe(Register, () => {
  test("the component should render correctly", () => {
    expect(componentRegister).toBeDefined();
  });

  test("the user should be able of registering introducing dates correctly", () => {
    const newUser = screen.getByPlaceholderText("Username");
    const newPassword = screen.getByPlaceholderText("Password");
    const repeatPassword = screen.getByPlaceholderText("Repeat Password");

    fireEvent.change(newUser, { target: { value: "alvarito" } });
    fireEvent.change(newPassword, { target: { value: "alvapass" } });
    fireEvent.change(repeatPassword, { target: { value: "alvapass" } });

    expect(newUser.value).toBe("alvarito")
    expect(newPassword.value).toBe("alvapass")
    expect(repeatPassword.value).toBe("alvapass")

    //Capturamos su boton a través de su rol y su name
    const button = screen.getByRole("button", {name: /Register/i});
    // Comprobamos que efectivamente está ahi
    expect(button).toBeDefined();
  });
});
