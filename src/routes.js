const express = require("express");
const multerConfig = require("./config/multer");
const upload = require("multer")(multerConfig);

const routes = express.Router();

const userController = require("./app/controllers/UserController");
const sessionController = require("./app/controllers/SessionController");
const authMeddleware = require("./app/meddlewares/auth");
const guestMeddleware = require("./app/meddlewares/guest");
const dashboardController = require("./app/controllers/DashboardController");
const fileController = require("./app/controllers/FileController");
const appointmentController = require("./app/controllers/AppointmentController");
const availableController = require("./app/controllers/AvailableController");
const ScheduleController = require("./app/controllers/ScheduleController");

routes.use((req, res, next) => {
  res.locals.flashSucces = req.flash("success");
  res.locals.flashError = req.flash("error");
  return next();
});
routes.get("/files/:file", fileController.show);
routes.get("/", guestMeddleware, sessionController.create);
routes.post("/signIn", sessionController.store);

routes.get("/signUp", guestMeddleware, userController.create);
routes.post("/signUp", upload.single("avatar"), userController.store);

routes.use("/app", authMeddleware);
routes.get("/app/logOut", sessionController.destroy);

routes.get("/app/dashboard", dashboardController.index);
routes.get("/app/appointments/new/:provider", appointmentController.create);
routes.post("/app/appointments/new/:provider", appointmentController.store);
routes.get("/app/available/:provider", availableController.index);

routes.get("/app/schedule", ScheduleController.index);
module.exports = routes;
