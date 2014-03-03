if (process.env.VCAP_SERVICES){

	var env = JSON.parse(process.env.VCAP_SERVICES),
		mysql_configuration = env['mysql-5.1'][0]['credentials'],
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