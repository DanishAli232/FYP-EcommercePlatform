import Chat from "./Models/ChatModel.js";

const users = [];

const addUser = async ({ id, userID, vendorID }) => {
  const existingUser = users.find(
    (user) => user.vendorID === vendorID && user.userID === userID
  );

  if (!userID || !vendorID)
    return { error: "Username and vendorID are required." };
  // if (existingUser) return { error: "Username is taken." };
  let data = await Chat.create();

  const user = { id, userID, vendorID };

  // users.push(user);

  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id) => {
  console.log(id);
  console.log(users);
  let data = users.find((user) => {
    console.log(user);
    user.id === id;
  });
  return data;
};

const getUsersInRoom = (room) => {
  console.log(room);
  return users.filter((user) => {
    console.log(user);
    user.room === room;
  });
};

export { addUser, removeUser, getUser, getUsersInRoom };
