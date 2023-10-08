"use client";

import { useEffect } from "react";
import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

import { auth } from "@/firebase";

const uiConfig = {
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
