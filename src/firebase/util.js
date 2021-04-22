import { firebase } from "./config";

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
