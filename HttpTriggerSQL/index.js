const sql = require('mssql');

const config = {
    user: 'Gordon99',
    password: 'TJ2nJKXb2asmw9k',
    server: 'gws-dev.database.windows.net', 
    database: 'GWS_Adunze',
    options: {
      encrypt: true, // Use this if you're on Windows Azure
    },
  };

// Connect to SQL Server
  sql.connect(config)
    .then(() => {
      console.log('Connected to SQL Server Trigger SQL');
    })
    .catch((err) => {
      console.error('Error connecting to SQL Server:', err);
    });
  
module.exports = async function (context, req) {

    const result = await sql.query('SELECT TOP (1000) * FROM [dbo].[Vancouver] order by ID_Column desc');
    const results = result.recordset
  
   
    const newObject = Object.assign({}, results)

    let locations = results.map(user => user.Messages)
// TESTS
      // console.log(typeof(result))
      // console.log(eval(result))
      // console.log(result.keys())
      // console.log(JSON.parse(result))
      // console.log(newObject[1])
      // console.log(Object.prototype.toString.call(result), "result")
      // console.log(Object.prototype.toString.call(results), "results")
      // console.log(Object.prototype.toString.call(newObject), "newObject")
      // console.log(Object.prototype.toString.call(locations), "locations")
      // console.log({locations}.toString.call(), "butt") // this doesn't work, don't use it
      // console.log(Array.isArray(results), "Array")
      // console.log(Object.isArray(results), "Array2") // this doesn't work, don't use it
      // console.log(Object.isObject(results), "Array3") // this doesn't work, don't use it
      // let i = 0;

      // while (i < results.length) {
      //     console.log(results[i].Messages);
      //     i++;
      // }

    context.res = {
      body: results,
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Credentials" : true
      }
    };
} 

