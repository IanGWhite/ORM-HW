/* app/routes/student.routes.js */
module.exports = (app) => {
    const students = require("../controllers/student.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new Student group
    router.post("/", students.create);
  
    // Retrieve all 
    router.get("/", students.findAll);
    
    // Retrieve a single student with id
    router.get("/:id", students.findOne);
  
    // Update a student with id
    router.put("/:id", students.update);
  
    // Delete a Student with id
    router.delete("/:id", students.delete);
  
    // Delete all Students
    router.delete("/", students.deleteAll);
  
    app.use("/student-t5/students", router);
  };
  
  