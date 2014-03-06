var mysql_configuration = {};

if (process.env.VCAP_SERVICES){
	var env = JSON.parse(process.env.VCAP_SERVICES);

	mysql_configuration = env['mysql-5.1'][0]['credentials'];
	console.log(mysql_configuration);
}

var Knex = require('knex'),
	knex = Knex.initialize({
	  client: 'mysql',
	  connection: {
	    host     : process.env.MYSQL_HOST || 'localhost',
	    user     : process.env.MYSQL_USER || 'root',
	    password : process.env.MYSQL_PASS || '',
	    database : process.env.MYSQL_DB || 'leads',
	    port     : 3306,
	    charset  : 'utf8'
	  }
});

exports.MysqlKnex = knex;