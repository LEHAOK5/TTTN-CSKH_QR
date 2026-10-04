const express = require('express');
const router = express.Router();

const deviceRoute = require('./device.route');
const authRoute = require('./account.route');
const ticketRoute = require('./ticket.route');
const publicRoute = require('./public.route');
const employeeRoute = require('./employee.route');
const adminRoute = require('./admin.route');

// Định tuyến API
router.use('/devices', deviceRoute);
router.use('/auth', authRoute);
router.use('/tickets', ticketRoute); // Khai báo đường dẫn /api/tickets

// Định tuyến mới
router.use('/public', publicRoute);
router.use('/employee', employeeRoute);
router.use('/admin', adminRoute);

module.exports = router;
