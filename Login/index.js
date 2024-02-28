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

module.exports = async (context, req) => {

    try {
        await mssql.connect(config);
    
        // Implement your authentication logic here (e.g., validate user credentials)
        // username: 'Don', password: '123' --for postman 
        // Sample code for user authentication
        const { username, password } = req.body;
        const user = await mssql.query`SELECT * FROM users WHERE username = ${username} AND password = ${password}`;
        
        if (user.recordset.length === 0) {
          context.res = {
            status: 401,
            body: 'Invalid username or password'
          };
        } else {
          // Create JWT token
        //   const token = jwt.sign({ username: user.username }, '<your-secret-key>', { expiresIn: '1h' });
    
          context.res = {
            status: 200,
            body: {
              token: "hello baby"
            }
          };
        }
      } catch (err) {
        context.res = {
          status: 500,
          body: err.message
        };
      } finally {
        await mssql.close();
      }

} 

