$(document).ready(function(){
	console.clear();
	var config = {
		apiKey: "AIzaSyDQ6MDRDgNEJj27bWpccofijN_jmeI7jT4",
		authDomain: "train-ae9bb.firebaseapp.com",
		databaseURL: "https://train-ae9bb.firebaseio.com",
		projectId: "train-ae9bb",
		storageBucket: "train-ae9bb.appspot.com",
		messagingSenderId: "1076131125826"
	};
  	firebase.initializeApp(config);
	var database = firebase.database();
	$("#add").on("click", function(e){
		e.preventDefault();
		var name = $("#name").val().trim();		
		var dest = $("#dest").val().trim();
		var time = moment($("#time").val().trim(), "HH:mm").subtract(10, "years").format("X");;
		var freq = $("#freq").val().trim();
		database.ref().set({
			name:  name,
			destination: dest,
			trainTime: time,
			frequency: freq,
		});  	
		$("#name").val("");
		$("#dest").val("");
		$("#time").val("");
		$("#freq").val("");
	});
	database.ref().on("value", function(snapshot){
		var db = snapshot.val();
		var firebaseName = snapshot.val().name;
		var firebaseDestination = snapshot.val().destination;
		var firebaseTrainTimeInput = snapshot.val().trainTime;
		var firebaseFrequency = snapshot.val().frequency;
		var diffTime = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes");
		var timeRemainder = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes") % firebaseFrequency ;
		var minutes = firebaseFrequency - timeRemainder;
		var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A"); 
		$("#trains").append("<tr><td>" + firebaseName + "</td><td>"+ firebaseDestination + "</td><td>" + firebaseFrequency + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");
	});
});
