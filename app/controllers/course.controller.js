/* app/controllers/course.controller.js */
const db = require("../models");
const Course = db.course;
const Op = db.Sequelize.Op;

// Create and Save a new Course
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Course needs a name!",
    });
    return;
  }

  // Create a Course
  const course = {
    department: req.body.department,
    courseNumber: req.body.courseNumber,
    level: req.body.level,
    hours: req.body.hours,
    name: req.body.name,
    description: req.body.description,
  };

  // Save Course in the database
  try {
    const data = await Course.create(course);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Course.",
    });
  }
};

// Function to test Course creation
const testCreateCourse = () => {
  const testCourseData = {
    department: "Amy P.",
    courseNumber: "CS101",
    level: "Undergraduate",
    hours: "3",
    name: "Introduction to Programming",
    description: "This is a foundational course in programming.",
  };

  // Mock request and response objects
  const mockReq = { body: testCourseData };
  const mockRes = {
    status: (code) => ({
      send: (response) => console.log(`Test course creation: Status ${code}`, response),
    }),
    send: (response) => console.log('Response:', response),
  };

  // Call the create function with mock data
  exports.create(mockReq, mockRes);
};

// Comment out test course later
//testCreateCourse();

// Export other functions (find, update, delete) as necessary
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  Course.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving courses.",
      });
    });
};

// Continue with other existing functions...

// Find a single Course with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Course.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Course with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Course with id=" + id,
      });
    });
};

// Update a Course by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Course.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Course was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Course with id=${id}. Maybe Course was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Course with id=" + id,
      });
    });
};

// Delete a Course with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Course.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Course was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Course with id=${id}. Maybe Course was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Course with id=" + id,
      });
    });
};

// Delete all Courses from the database.
exports.deleteAll = (req, res) => {
  Course.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Courses were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all courses.",
      });
    });
};
