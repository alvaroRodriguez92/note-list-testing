import Login from "./Login";
import Note from "../Note/Note";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, beforeEach } from "@jest/globals";

let componentLogin;
let componentNote;

//Usamos el beforeEach para rederizar nuestro componente con cada test
beforeEach(() => {
  componentLogin = render(<Login/>);
  componentNote = render(<Note/>);
});

describe(Login, () => {
  test("The component Login should be rendered", () => {
    expect(componentLogin).toBeDefined();
    expect(componentNote).toBeDefined();
  });

  test("The user should be able to login introducing the correct credentials", () => {
    //Capturamos los input con el placeholder
    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");

    //Simulamos que escribimos en los input y nos aseguramos que se captura bien su valor
    fireEvent.change(usernameInput, { target: { value: "alvaritoss" } });
    fireEvent.change(passwordInput, { target: { value: "alvapass" } });
    expect(usernameInput.value).toBe("alvaritoss");
    expect(passwordInput.value).toBe("alvapass");

    //Capturamos su boton a través de su rol y su name, no lo clicamos por que desaparecería nuestro componente y aparecería otro.
    const button = screen.getByRole("button", {name: /Login/i});
    expect(button).toBeDefined();
    fireEvent.click(button);

    //Nos aseguramos de que el login fue exitoso al aparecer el texto de bienvenido
    // const errorText = screen.getByText(/Error/i);
    // expect(errorText).toBeDefined();

  });
});
