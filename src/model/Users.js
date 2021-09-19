import { firebase } from "../firebase/config";

export const getUserFromUid = async (uid) => {
  var returnVal = null;
  await firebase
    .database()
    .ref(`users/${uid}`)
    .once("value", (snapshot) => {
      if (snapshot.exists()) {
        returnVal = snapshot.val();
      } else {
        returnVal = null;
      }
    });
  return returnVal;
};

/* Return: error object if any, null otherwise */
export const login = async (email, password) => {
  var err = null;
  const response = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch((error) => {
      err = error;
    });
  return err;
};

/* Return: error object if any, null otherwise */
export const register = async (
  email,
  password,
  firstName,
  lastName,
  profilePictureUri = null
) => {
  var err = null;
  const response = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch((error) => {
      err= error;
    });

  const uid = response.user.uid;
  const userData = {
    uid: uid,
    email: email,
    firstName: firstName,
    lastName: lastName,
    profilePictureUri: profilePictureUri,
  };

  const promise = await firebase
    .database()
    .ref("users/" + uid)
    .set(userData);
  return err;
};

/* Return: error object if any, null otherwise */
export const logout = async () => {
  err = null;

  const response = await firebase
    .auth()
    .signOut()
    .catch((error) => {
      err= error;
    });

  return err;
};
