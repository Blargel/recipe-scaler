import {
  FirestoreDataConverter,
  collection,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import { db } from "@/firebase";

export interface UserData {
  email: string | null;
}

const userConverter: FirestoreDataConverter<UserData> = {
  toFirestore: (user) => user,
  fromFirestore: (userDoc) => userDoc.data() as UserData,
};

export function usersCollection() {
  return collection(db, "users").withConverter(userConverter);
}

export function usersDoc(userId: string) {
  return doc(usersCollection(), userId);
}

export async function setUser(userId: string, userData: UserData) {
  return setDoc(usersDoc(userId), userData);
}

export async function getUser(userId: string) {
  return getDoc(usersDoc(userId));
}
