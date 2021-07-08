import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

import SignInFormikContext from "../../components/SignInFormikContext";

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      const onSubmit = jest.fn();
      const testUser = { username: "kalle", password: "password" };

      const { getByTestId } = render(
        <SignInFormikContext onSubmit={onSubmit} />
      );

      fireEvent.changeText(getByTestId("usernameField"), testUser.username);
      fireEvent.changeText(getByTestId("passwordField"), testUser.password);
      fireEvent.press(getByTestId("submitButton"));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: "kalle",
          password: "password",
        });
      });
    });
  });
});
