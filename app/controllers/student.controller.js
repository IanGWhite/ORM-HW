/* app/controllers/student.controller.js */
const db = require("../models");
const Student = db.student;
const Op = db.Sequelize.Op;

// Create and Save a new Student
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.fName) {
    res.status(400).send({
      message: "Student needs a name!",
    });
    return;
  }

  // Create a Student
  const student = {
    fName: req.body.fName,
    lName: req.body.lName,
    year: req.body.year
  };

  // Save Student in the database
  try {
    const data = await Student.create(student);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Student.",
    });
  }
};

// Function to test Student creation
const testCreateStudent = () => {
  const testStudentData = {
    fName: "Amy",
    lName: "Lasseter",
    year: "Undergraduate",
  };

  // Mock request and response objects
  const mockReq = { body: testStudentData };
  const mockRes = {
    status: (code) => ({
      send: (response) => console.log(`Test student creation: Status ${code}`, response),
    }),
    send: (response) => console.log('Response:', response),
  };

  // Call the create function with mock data
  exports.create(mockReq, mockRes);
};

// Comment out test student later
//testCreateStudent();

// Export other functions (find, update, delete) as necessary
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  Student.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving students.",
      });
    });
};

// Continue with other existing functions...

// Find a single Student with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Student.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Student with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Student with id=" + id,
      });
    });
};

// Update a Student by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Student.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Student was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Student with id=${id}. Maybe Student was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Student with id=" + id,
      });
    });
};

// Delete a Student with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Student.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Student was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Student with id=${id}. Maybe Student was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Student with id=" + id,
      });
    });
};

// Delete all Students from the database.
exports.deleteAll = (req, res) => {
  Student.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Students were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all students.",
      });
    });
};
