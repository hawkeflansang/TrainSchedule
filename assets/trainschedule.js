var config = {
  apiKey: "AIzaSyCNgmYr7-h-xO6vSyUYz_ka2H3TeCAB-g0",
  authDomain: "train-schedule-b2c0d.firebaseapp.com",
  databaseURL: "https://train-schedule-b2c0d.firebaseio.com",
  projectId: "train-schedule-b2c0d",
  storageBucket: "train-schedule-b2c0d.appspot.com",
  messagingSenderId: "487878391040",
  appId: "1:487878391040:web:194d3bec2c5429478dafe5",
  measurementId: "G-859JHKB570"
};

firebase.initializeApp(config);

var database = firebase.database();


$("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainFirst = moment($("#first-train-input").val().trim(),"hh:mm").format("X");
    var trainFrequency = moment($("#frequency-input").val().trim(),"minutes").format("X");

    var newTrain = {
        name: trainName,
        destination: trainDestination,
        firstArrivval: trainFirst,
        frequency: trainFrequency
    };

    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstArrival);
    console.log(newTrain.frequency);


})