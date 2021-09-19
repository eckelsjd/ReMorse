import { getUserFromUid } from "./Users";
import { FRIEND_ADDED, FRIEND_REMOVED } from "./Constants";
import {firebase} from "../firebase/config"
import {AuthContext} from "../navigation/AuthProvider"
const friendsRef = firebase.database().ref("friends/");
const friendRequestsRef = firebase.database().ref("friendRequests/");

const contextType = AuthContext;

  _user = () => {
    return this.context.user;
  };

subscribeToFriendListeners = async () => {
  // friend added
  friendsRef.child(_user().uid).on(
    "child_added",
    async (snapshot) => {
      console.log(`friend added: ${snapshot.key}`);
      const friendUid = snapshot.key;
      const friend = await getUserFromUid(friendUid);

      const friendAddedEvent = new Event(FRIEND_ADDED, { friend: friend });
      dispatchEvent(friendAddedEvent);
    },
    (error) => {
      console.log(`${error.code}: ${error.message}`);
    }
  );

  //friend removed
  friendsRef.child(_user().uid).on(
    "child_removed",
    (snapshot) => {
      console.log(`friend removed: ${snapshot.key}`);
      const friendUid = snapshot.key;
      const friendRemovedEvent = new Event(FRIEND_REMOVED, {
        friendUid: friendUid,
      });

      dispatchEvent(friendRemovedEvent);
    },
    (error) => {
      console.log(`${error.code}: ${error.message}`);
    }
  );
};

// subscribeToFriendRequestListeners = async () => {
//   // friend request added
//   friendRequestsRef.child(this._user().uid).on(
//     "child_added",
//     async (snapshot) => {
//       const friendUid = snapshot.key;
//       console.log(`friend request from: ${friendUid}`);
//       const friend = await getUserFromUid(friendUid);
//       this.setState({
//         friendRequests: [...this.state.friendRequests, friend],
//       });
//     },
//     (error) => {
//       console.log(`${error.code}: ${error.message}`);
//     }
//   );

//   //friend request removed
//   friendRequestsRef.child(this._user().uid).on(
//     "child_removed",
//     (snapshot) => {
//       console.log(`friend request dismissed: ${snapshot.key}`);
//       const friendUid = snapshot.key;
//       const newFriendRequests = this.state.friendRequests.filter(
//         (request) => request.uid !== friendUid
//       );
//       this.setState({ friendRequests: newFriendRequests });
//     },
//     (error) => {
//       console.log(`${error.code}: ${error.message}`);
//     }
//   );
// };

unsubscribeFromFriendListeners = async ()=> {
  friendsRef.off();
  friendsRef.child(this._user().uid).off();
};

unsubscribeFromFriendRequestListeners = async ()=> {
  friendRequestsRef.off();
  friendRequestsRef.child(this._user().uid).off();
};