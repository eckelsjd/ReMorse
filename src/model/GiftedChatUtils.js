export const getGiftedChatMessage = (message, user, audio = null) => {
    const _user = getGiftedChatUser(user);
    return {
      _id: message.id,
      text: message.text,
      createdAt: message.timestamp,
      user: _user,
      image: message.imageUri,
      video: message.videoUri,
      audio: audio,
      system: false,
      sent: false,
      received: false,
      pending: true,
      quickReplies: null,
    };
  };
  
  export const getGiftedChatUser = (user) => {
    return {
      _id: user.uid,
      name: `${user.firstName} ${user.lastName}`,
      avatar: user.profilePictureUri,
    };
  };
  