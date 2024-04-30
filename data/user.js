const mongoCollections = require('../config/mongoCollections');


// Initialize Firebase
var config = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

firebase.initializeApp(config);

// Create a reference to the database
var database = firebase.database();

const users = mongoCollections.users;

 const createUser = async () => {
  // Generate a new key for the team
  var newTeamKey = firebase.database().ref().child('teams').push().key;
  // Create a new team object
  var newTeam = {
    name: name,
    address: address,
    startDate: startDate,
    estimatedTime: estimatedTime
  };
  
  // Write the new team's data to the database\
  var updates = {};
  updates['/teams/' + newTeamKey] = newTeam;

  return firebase.database().ref().update(updates);

 };

 const getAllUsers = async () => {
  //will get all the users
  const userCollection = await users();
  const userList = await userCollection.find({}).toArray();
  return userList;
 };

 const getUserById = async (userId) => {
  if (!userId) throw 'You must provide a user ID';
  const userCollection = await users();
  const user = await userCollection.findOne({ _id: userId });
  if (!user) throw 'User not found';
  return user;
 };

 const removeUser = async (userId) => {
  if (!userId) throw 'You must provide a user ID';
  const userCollection = await users();
  const deletionInfo = await userCollection.deleteOne({ _id: userId });
  if (deletionInfo.deletedCount === 0) throw `Could not delete user with ID ${userId}`;
  return true;
 };

 const updateUser = async (userId,updatedUser) => {
  if (!userId) throw 'You must provide a user ID';
  if (!updatedUser) throw 'You must provide an updated user object';
  const userCollection = await users();
  const updatedUserData = {
    name: updatedUser.name,
    email: updatedUser.email,
    phone: updatedUser.phone
  };
  const updateInfo = await userCollection.updateOne({ _id: userId }, { $set: updatedUserData });
  if (updateInfo.modifiedCount === 0) throw `Could not update user with ID ${userId}`;
  return await getUserById(userId);
 };

 module.exports = {
   createUser,
   getAllUsers,
   getUserById,
   removeUser,
   updateUser
 };