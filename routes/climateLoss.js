const express = require("express");
const router = express.Router();
const ClimateEventLossController = require("../controllers/ClimateEventLossController");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error("Images only (JPEG, JPG, PNG)!"));
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 }
});

router.post("/report", upload.single("proofImage"), ClimateEventLossController.submitLossReport);
router.get("/view", ClimateEventLossController.viewLossReports);
router.get("/view/reports", ClimateEventLossController.viewUserLossReports);
router.get("/admin/analysis", ClimateEventLossController.viewAllLossReports);
router.post("/admin/approve/:reportId", ClimateEventLossController.approveReport);
router.post("/admin/disapprove/:reportId", ClimateEventLossController.disapproveReport);

module.exports = router;