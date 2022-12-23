const express = require("express");
const router = express.Router();
const { healthCheck } = require("../controllers/generalController");

/**
 * Health Check
 */
router.get("/health", healthCheck);

module.exports = router;
