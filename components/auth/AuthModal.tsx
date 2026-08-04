"use client";

import { FormEvent, useState } from "react";
import { FirebaseError } from "firebase/app";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "@/redux/store";
import { closeAuthModal } from "@/redux/uiSlice";
import {
  login,
  loginAsGuest,
  register,
} from "@/services/auth";

type AuthMode = "login" | "register";
function getAuthErrorMessage(errorCode: string) {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "An account already exists with this email.";

    case "auth/invalid-email":
      return "Please enter a valid email address.";

    case "auth/weak-password":
      return "Your password must contain at least six characters.";

    case "auth/invalid-credential":
      return "The email or password is incorrect.";

    case "auth/too-many-requests":
      return "Too many attempts. Please wait and try again.";

    default:
      return "Authentication failed. Please try again.";
  }
}

export default function AuthModal() {
  const dispatch = useDispatch();
  const router = useRouter();
  const isOpen = useSelector(
    (state: RootState) => state.ui.isAuthModalOpen
  );

const [authMode, setAuthMode] = useState<AuthMode>("login");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [isSubmitting, setIsSubmitting] = useState(false);
const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const isLogin = authMode === "login";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  setErrorMessage("");
  setIsSubmitting(true);

  try {
    if (isLogin) {
      await login(email, password);
    } else {
      await register(email, password);
    }

    handleClose();
    router.push("/for-you");
  } catch (error) {
    if (error instanceof FirebaseError) {
      setErrorMessage(getAuthErrorMessage(error.code));
    } else {
      setErrorMessage(
        "Something went wrong. Please try again."
      );
    }
  } finally {
    setIsSubmitting(false);
  }
}

  function handleClose() {
    dispatch(closeAuthModal());
    setAuthMode("login");
    setEmail("");
    setPassword("");
    setErrorMessage("");
  }

async function handleGuestLogin() {
  try {
    const userCredential = await loginAsGuest();

    router.push("/for-you");
  } catch (error) {
    setErrorMessage("Failed to log in as a guest.");
  }
}

  return (
    <div
      className="auth-modal__overlay"
      onClick={handleClose}
    >
      <div
        className="auth-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="auth-modal__close"
          type="button"
          aria-label="Close authentication modal"
          onClick={handleClose}
        >
          ×
        </button>

        <h2 id="auth-modal-title" className="auth-modal__title">
          {isLogin ? "Log in to Summarist" : "Create your account"}
        </h2>

        <button className="auth-modal__guest-button" type="button" onClick={handleGuestLogin}>
          Login as a Guest
        </button>

        <button className="auth-modal__google-button" type="button">
          Login with Google
        </button>

        <div className="auth-modal__divider">
          <span>or</span>
        </div>

        <form
          className="auth-modal__form"
          onSubmit={handleSubmit}
        >
          <label className="auth-modal__label" htmlFor="email">
            Email address
          </label>

          <input
            className="auth-modal__input"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label className="auth-modal__label" htmlFor="password">
            Password
          </label>

        <input
  className="auth-modal__input"
  id="password"
  name="password"
  type="password"
  autoComplete={isLogin ? "current-password" : "new-password"}
  value={password}
  onChange={(event) => setPassword(event.target.value)}
  minLength={6}
  required
/>

{errorMessage && (
  <p className="auth-modal__error" role="alert">
    {errorMessage}
  </p>
)}

<button
  className="btn auth-modal__submit"
  type="submit"
  disabled={isSubmitting}
>
  {isSubmitting
    ? "Please wait..."
    : isLogin
      ? "Login"
      : "Create account"}
</button>

</form>

<button
  className="auth-modal__switch"
  type="button"
  onClick={() => {
    setAuthMode(isLogin ? "register" : "login");
    setErrorMessage("");
  }}
>
  {isLogin
    ? "Don't have an account? Register"
    : "Already have an account? Log in"}
</button>  
      </div>
    </div>
  );
}