const {Router} = require('express');
const ScheduleController = require('../controllers/ScheduleController');


const router = Router();

router.get("/schedules", ScheduleController.getAll)
router.post("/schedules", ScheduleController.createWithUser)
router.post("/schedules/:userId", ScheduleController.createByUserId)
router.get("/schedules/:id", ScheduleController.getOne)
router.get("/schedules/:userId/user", ScheduleController.getAllByUserId)
router.put("/schedules/:id", ScheduleController.update)
router.delete("/schedules/:id", ScheduleController.delete)

module.exports = router;
