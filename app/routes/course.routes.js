/* app/routes/course.routes.js */
module.exports = (app) => {
  const courses = require("../controllers/course.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new Course group
  router.post("/", courses.create);

  // Retrieve all 
  router.get("/", courses.findAll);
  
  // Retrieve a single course with id
  router.get("/:id", courses.findOne);

  // Update a course with id
  router.put("/:id", courses.update);

  // Delete a Course with id
  router.delete("/:id", courses.delete);

  // Delete all Courses
  router.delete("/", courses.deleteAll);

  app.use("/course-t5/courses", router);
};

