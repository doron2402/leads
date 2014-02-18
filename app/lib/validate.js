/*
	Validate email address
*/
exports.isValidEmail = function(email){
	var filter = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
	return String(email).search (filter) != -1;
};
