if (process.env.VCAP_SERVICES){

	console.log(process.env.VCAP_SERVICES);
	var VCAP_SERVICES = process.env.VCAP_SERVICES["mysql-5.1"],
		mysql_configuration = VCAP_SERVICES[0]["credentials"],
		Knex = require('knex'),
		knex = Knex.initialize({
	  client: 'mysql',
	  connection: {
	    host     : mysql_configuration.hostname,
	    user     : mysql_configuration.username,
	    password : mysql_configuration.password,
	    database : mysql_configuration.name,
	    charset  : 'utf8'
	  }
	});
}else{

	var Knex = require('knex'),
		knex = Knex.initialize({
	  client: 'mysql',
	  connection: {
	    host     : 'localhost',
	    user     : 'root',
	    password : '',
	    database : 'leads',
	    charset  : 'utf8',
	  }
	});
}


exports.MysqlKnex = knex;