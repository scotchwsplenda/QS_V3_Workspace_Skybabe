const sql = require('mssql');
const jwt = require('jsonwebtoken');


const config = {
    user: 'Gordon99',
    password: 'TJ2nJKXb2asmw9k',
    server: 'gws-dev.database.windows.net', 
    database: 'GWS_Adunze',
    options: {
      encrypt: true, // Use this if you're on Windows Azure
    },
  };

module.exports = async (context, req) => {

        const { username, password } = req.body;
        const user = await sql.query`SELECT * FROM Users WHERE username = ${username} AND password = ${password}`;


        if (user.recordset.length === 0) {
          context.res = {
            status: 401,
            body: 'Invalid username or password'
          };
        } else {
            // Create JWT token 
          const token = jwt.sign({ username: user.username}, 'x', { expiresIn: '1h' });

          context.res = {
            status: 200,
            body: {
              token: username,
              broken: password,
              spoken: token
            }
          }
        };

} 

