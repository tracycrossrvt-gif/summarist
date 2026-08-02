"use client";

import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeAuthModal } from "@/redux/uiSlice";
import type { RootState } from "@/redux/store";

type AuthMode = "login" | "register";

export default function AuthModal() {
  const dispatch = useDispatch();

  const isOpen = useSelector(
    (state: RootState) => state.ui.isAuthModalOpen
  );

  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const isLogin = authMode === "login";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log({
      authMode,
      email,
      password,
    });
  }

  function handleClose() {
    dispatch(closeAuthModal());
    setAuthMode("login");
    setEmail("");
    setPassword("");
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

        <button className="auth-modal__guest-button" type="button">
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
            autoComplete={
              isLogin ? "current-password" : "new-password"
            }
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            minLength={6}
            required
          />

          <button className="btn auth-modal__submit" type="submit">
            {isLogin ? "Login" : "Create account"}
          </button>
        </form>

        <button
          className="auth-modal__switch"
          type="button"
          onClick={() =>
            setAuthMode(isLogin ? "register" : "login")
          }
        >
          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Log in"}
        </button>
      </div>
    </div>
  );
}