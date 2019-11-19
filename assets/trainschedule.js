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
    var trainFirst = $("#first-train-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();

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

    alert("New Train Info Added!!");

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
})


database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainFirst = childSnapshot.val().firstArrivval;
    var trainFrequency = childSnapshot.val().frequency;

    console.log(trainName);
    console.log(trainDestination);
    console.log(trainFirst);
    console.log(trainFrequency);


    var firstTime = moment(trainFirst, "HH:MM").subtract(1, "years");
    console.log(firstTime);

    var currentTime = moment();
    console.log(moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(firstTime), "minutes");
    console.log(diffTime);

    var timeRemain = diffTime % trainFrequency;
    console.log(timeRemain);

    var timeTill = trainFrequency - timeRemain;
    console.log(timeRemain);

    var trainNext = moment().add(timeTill, "minutes");
    console.log(trainNext);


    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(trainFrequency),
        $("<td>").text(moment(trainNext).format("hh:mm")),
        $("<td>").text(moment(timeTill), "minutes")

    );


    $("#train-schedule > tbody").append(newRow);

})