"use client";

import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { auth } from "../firebase";
import { useEffect } from "react";

const uiConfig = {
  signInSuccessUrl: "/",
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  signInFlow: "popup",
};

const ui = new firebaseui.auth.AuthUI(auth);

export default function LoginUI() {
  useEffect(() => {
    ui.start("#firebaseui-auth-container", uiConfig);
  }, []);

  return <div id="firebaseui-auth-container"></div>;
}
