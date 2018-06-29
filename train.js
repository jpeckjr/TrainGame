var config = {
    apiKey: "AIzaSyCl0E2LJXGERIEMBaqiZbcoONj_LgvmGMY",
    authDomain: "myfirstfirebase-83574.firebaseapp.com",
    databaseURL: "https://myfirstfirebase-83574.firebaseio.com",
    projectId: "myfirstfirebase-83574",
    storageBucket: "myfirstfirebase-83574.appspot.com",
    messagingSenderId: "1059786129025"
  };

  firebase.initializeApp(config);

var database = firebase.database();

  

var trainName = "";
var destination = "";
var firstTrain = 0;
var frequency = 0;
var currentTime= moment()

setInterval(function(){
        $("#current-time").html(moment(moment()).format("hh:mm:ss"));
    }, 1000);

  
$("#submit").on("click", function(event) {
  event.preventDefault();


	trainName = $("#trainName").val().trim();

	destination = $("#destination").val().trim();

	firstTrain = $("#firstTrain").val().trim();

	frequency = $("#frequency").val().trim();

  $("#trainName").val("");
  $("#destination").val("");
  $("#firstTrain").val("");
  $("#frequency").val("");

    database.ref().push({

	    trainName: trainName,
	    destination: destination,
	    firstTrain: firstTrain,
	    frequency: frequency

	});
});

 

database.ref().on("child_added", function(childSnapshot) {



	  var firstTimeConverted = moment(childSnapshot.val().firstTrain, "hh:mm").subtract(1, "days");

 	  var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
  
    var remainder = timeDiff % childSnapshot.val().frequency;
  
    var minsUntilTrain = childSnapshot.val().frequency - remainder;
 
    var nextTrainTime = moment().add(minsUntilTrain, "minutes");
  
  		
    $("#schedule > tbody").append("<tr><td>" + childSnapshot.val().trainName + "</td><td>" + childSnapshot.val().destination + "</td><td>" +
        childSnapshot.val().frequency + "</td><td>" + moment(nextTrainTime).format("hh:mm") + "</td><td>" + minsUntilTrain + "</td></tr>");

	     
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);

});
  