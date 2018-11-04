$(document).ready(function() {

	// 1. Initialize Firebase
	var config = {
		apiKey: "AIzaSyC1C3SxnDVjUSs4zmGOURUDdf9jqIeu31g",
		authDomain: "trainschedule-boot.firebaseapp.com",
		databaseURL: "https://trainschedule-boot.firebaseio.com",
		projectId: "trainschedule-boot",
		storageBucket: "trainschedule-boot.appspot.com",
		messagingSenderId: "693031094459"
  };
  
  firebase.initializeApp(config);

  var database = firebase.database();

  //btn used to submit user-input
  $("#submit-btn").on("click", function(event) {
  		event.preventDefault();

	 // Grabs user input
	  var nameofTrain = $("#train-name-input").val().trim();
	  var trainDestination = $("#dest-input").val().trim();
	  var firsttrainTime = $("#firstTrain-input").val().trim();
	  var trainFreq = $("#freq-input").val().trim();

	  // Creates local "temporary" object for holding train data
	  var newTrain = {
	  	name: nameofTrain,
	  	destination: trainDestination,
	  	start: firsttrainTime,
	  	frequency: trainFreq
	  };

	  // Uploads train data to the database
  		database.ref().push(newTrain);

	 // Clears all of the text-boxes
	  $("#train-name-input").val("");
	  $("#dest-input").val("");
	  $("#firstTrain-input").val("");
	  $("#freq-input").val("");
  	});

  	//Data is being stored into the database
	database.ref().on("child_added", function(childSnapshot, prevChildKey) {

	  console.log(childSnapshot.val());

	  
	  var nameofTrain = childSnapshot.val().name;
	  var trainDestination = childSnapshot.val().destination;
	  var firsttrainTime = childSnapshot.val().start;
	  var trainFreq = childSnapshot.val().frequency;

    // Section were we start to use moment()
   
  		var trainFreq;

   		 var firstTime = 0;

	   var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
	    console.log(firstTimeConverted);

	  
	    var currentTime = moment();
	    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    // This section was confusing, not sure how i got it to work. Watched youtube video as well as class instruction video several times
    // Secion on calculation for diff time
		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		console.log("TIME DIFFERENCE: " + diffTime);

    // created a variable for the remainder, by calaculting the difference and the frequency
	    var tRemainder = diffTime % trainFreq;
	    console.log(tRemainder);

      // Creating the minutes till the train arrives by taking the calculations from the frequrncy and the reamined to get the minutes till train. 
	    var tMinutesTillTrain = trainFreq - tRemainder;
	    console.log("TRAIN ARRIVES IN: " + tMinutesTillTrain + " MINUTES");

      // Here is the data from the minutes till the next train
      //The format is in hours and minutes
      //Created a new variable for the next train arrival
	    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
	    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));


	  //Here i am appending the return data from the values of my form inputs. I am appending it to the train-table row. 
	  $("#train-table > tbody").append("<tr><td>" + nameofTrain + "</td><td>" + trainDestination + "</td><td>" + trainFreq + 
	   "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
	});

});