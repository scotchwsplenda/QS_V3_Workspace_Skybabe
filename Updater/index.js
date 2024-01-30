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

  // Object.keys(req.body).forEach(key => {
  //   console.log(`  ${key}:`, req.body[key]);});
  //   console.log('Body:', JSON.stringify(req.body, null, 2));
  //   console.log(req.body, 'req.body');

    const {Message} = req.body;
    const pool = await sql.connect(config)    
    const result = await pool
    .request()
    .input('Message', sql.NVarChar, Message)
    .query('INSERT INTO [dbo].[Vancouver] ( Messages) VALUES ( @Message)');
    context.res.json(result);
    

} 

