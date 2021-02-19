import { firebase } from "./config";

export const getUserFromUid = (uid) => {
  firebase.database().ref(`users/${uid}`).once(
      "value",
      snapshot => {
          if(snapshot.exists()){
              return snapshot.val();
          }else{
              return null
          }
      }
  );
};
