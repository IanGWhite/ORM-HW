module.exports = (app) => {
  const courses = require("../controllers/course.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new Course for a Student
  //router.post("/:studentId/courses/", [authenticate], courses.create);
  router.post("/:studentId/courses/", courses.create);

  // Retrieve all Courses for a Student
  router.get(
    "/:studentId/courses/",
    courses.findAllForStudent
  );

  // Retrieve a single Course with id
  //router.get("/:studentId/courses/:id", [authenticate], courses.findOne);
  router.get("/:studentId/courses/:id", courses.findOne);

  // Update a Course with id
  router.put("/:studentId/courses/:id", courses.update);

  // Delete a Course with id
  router.delete("/:studentId/courses/:id", courses.delete);

  // Delete all Courses
  router.delete("/:studentId/courses/deleteAll", courses.deleteAll);

  app.use("/student-t5/students", router);
};
