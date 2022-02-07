const Express = require('express');
const route = require('./routes.js');
const cors = require('cors')
require('dotenv').config();

const app = Express();
app.use(cors())
app.use(Express.json())
app.use(route)

const Connection = require('./src/database/Connection.js');


app.listen(process.env.APP_PORT, () => {
    console.log('Server on na porta ', process.env.APP_PORT);
    Connection.sync();
})