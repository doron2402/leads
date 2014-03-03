if (process.env.VCAP_SERVICES){

	var mysql_configuration = process.env.VCAP_SERVICES,
		Knex = require('knex'),
		knex = Knex.initialize({
	  client: 'mysql',
	  connection: {
	    host     : mysql_configuration['mysql-5.1'].credentials.host,
	    user     : mysql_configuration['mysql-5.1'].credentials.username,
	    password : mysql_configuration['mysql-5.1'].credentials.password,
	    port     : mysql_configuration['mysql-5.1'].credentials.port,
	    database : 'leads',
	    charset  : 'utf8',
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