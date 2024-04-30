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

// Function to add a new team to the database
function addTeam(name, address, startDate, estimatedTime) {
    // Generate a new key for the team
    var newTeamKey = firebase.database().ref().child('teams').push().key;

    // Create a new team object
    var newTeam = {
        name: name,
        address: address,
        startDate: startDate,
        estimatedTime: estimatedTime
    };

    // Write the new team's data to the database
    var updates = {};
    updates['/teams/' + newTeamKey] = newTeam;

    return firebase.database().ref().update(updates);
}