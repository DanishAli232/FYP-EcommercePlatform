import Chat from "./Models/ChatModel.js";

const users = [];

const addUser = async ({ id, userID, vendorID }) => {
  let existingUser = await Chat.findOne({ customer: userID, vendor: vendorID });
  if (existingUser) {
    console.log("existingUser");
    return existingUser;
  }

  if (!userID || !vendorID)
    return { error: "Username and vendorID are required." };
  // if (existingUser) return { error: "Username is taken." };
  let data = await Chat.create({
    customer: userID,
    vendor: vendorID,
    chat: [],
  });
  console.log(data);
  // users.push(user);

  return data;
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = async (id) => {
  console.log(id);
  console.log(users);
  let data1 = {};
  try {
    let data = await Chat.updateOne(
      { customer: id.sender, vendor: id.receiver },
      { $push: { chat: { text: id.message, sender: id.name } } }
    );
    console.log(data);
    data1 = { user: data, error: false };
    console.log("ok");
  } catch (error) {
    data1 = { user: undefined, error: true };
    console.log(error);
  }

  // let data = users.find((user) => {
  //   console.log(user);
  //   user.id === id;
  // });
  return data1;
};

const getUsersInRoom = (room) => {
  console.log(room);
  return users.filter((user) => {
    console.log(user);
    user.room === room;
  });
};

export { addUser, removeUser, getUser, getUsersInRoom };
