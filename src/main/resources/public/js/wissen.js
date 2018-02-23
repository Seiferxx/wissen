/**
 * Utility function to format date values from Javascript Date object
 */
Number.prototype.pad = function(size) {
	var s = String(this);
	while (s.length < (size || 2)) {s = "0" + s;}
	return s;
};

/**
 *  Utility function to format date values to compact 3 digit time difference from current date
 */
function dateToStringCompact(fdate){
	var actualDate = new Date();
	var providedDate = fdate;
	var milis = providedDate.getTime() - actualDate.getTime();
	
	if(milis > 31536000000) {
		return (Math.trunc(milis/31536000000)).pad(2) + "y";
	} else if(milis > 2592000000) {
		return (Math.trunc(milis/2592000000)).pad(2) + "M";
	} else if(milis > 86400000) {
		return (Math.trunc(milis/86400000)).pad(2) + "d";
	} else if(milis > 3600000){
		return (Math.trunc(milis/3600000)).pad(2) + "h";
	} else if(milis > 60000){
		return (Math.trunc(milis/60000)).pad(2) + "m";
	} else {
		return "ovd";
	}
}

/**
 * Utility function to get label color based on due date
 * 
 * @param fdate
 * @returns
 */
function getLabelColor(fdate){
	var actualDate = new Date();
	var providedDate = fdate;
	var milis = providedDate.getTime() - actualDate.getTime();
	
	if(milis > 18000000){
		return "teal";
	} else if (milis > 7200000){
		return "yellow";
	} else {
		return "red";
	}
}

/**
 * Utility function to format date values
 * 
 * @param fdate
 * @returns
 */
function formatDate(fdate){
	return (fdate.getMonth()+1).pad(2) + "/"+(fdate.getDate()).pad(2)+"/"+fdate.getFullYear() + " " + (fdate.getHours()).pad(2) + ":"+(fdate.getMinutes()).pad(2);
}

/**
 * Session token validation
 */
//<![CDATA[
function validateToken(callback){
	if($.cookie("authuser") != undefined && $.cookie("authtoken") != undefined) {
		valid = false;
		$.ajax({
			type: 'GET',
			url: "/oauth/check_token?token=" + $.cookie("authtoken"),
			headers: {
				"Authorization" : "Basic bWFzdGVyOjEyMzQ1Ng==",
				"Accept" : "application/json"
			},
			success: function(response) {
				callback(true);
			},
			error: function(XMLHttpRequest) {
				if(XMLHttpRequest.status === 400) {
					callback(false);
				}
				$.removeCookie("authuser");
				$.removeCookie("authtoken");
				//TODO implement other error status handling
			}
		});
	} else {
		callback(false);
	}
}
//]]>

/*eslint-disable no-undef */
$('.ui.dropdown').dropdown();
$('.ui.modal').modal();
$('.progress').progress();
$('.message .close').on('click', function() {
	$(this).closest('.message').transition('fade');
});
var globalTimeOut = null;

/**
 * Used to raise the modal for authentication
 */
function showAuthModal(origin){
	if($.cookie("authuser") === undefined && $.cookie("authtoken") === undefined) {
		//Modal init
		$("#wrongcredentials").addClass("hidden");
		$("#user").val("");
		$("#passwd").val("");
		if(origin === "menuButton"){
			$("#usageNotex").addClass("hiddenf");
			$("#welcomeNotex").removeClass("hiddenf");
		} else if(origin === "feature"){
			$("#welcomeNotex").addClass("hiddenf");
			$("#usageNotex").removeClass("hiddenf");
		}
		$("#authmod").modal("show");
	}
}

/**
 * Authentication step
 */
//<![CDATA[
function authenticate(){
	var user = $("#user").val().trim();
	var passwd = $("#passwd").val().trim();
	$.ajax({
		type: 'POST',
		url: "/oauth/token",
		headers: {
			"Authorization" : "Basic bWFzdGVyOjEyMzQ1Ng==",
			"Accept" : "application/json"
		},
		contentType: "application/x-www-form-urlencoded",
		data: {
			password : passwd,
			username : user,
			grant_type : "password"
		},
		error: function(XMLHttpRequest) {
			if(XMLHttpRequest.status === 400) {
				$("#wrongcredentials").removeClass("hidden");
			}
		},
		success: function(resultData) {
			$.cookie("authtoken", resultData.access_token);
			$.cookie("authuser", user);
			$("#authmod").modal("hide");
			validateToken(refreshPageElements);
		}
	});
}
//]]>