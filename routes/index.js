const bodyParser = require('body-parser');
const cors = require('cors');
const UserRoutes = require('./UserRoutes');
const ScheduleRoutes =  require('./ScheduleRoutes')
module.exports = app =>{
    app.use(bodyParser.json());
    app.use(cors());
    app.use(UserRoutes)
    app.use(ScheduleRoutes)
}
