// StudentsController.js
// Import students model
Students = require('./studentsModel');
// Handle index actions
exports.index = function (req, res) {
    Students.find(function (err, students) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "students retrieved successfully",
            data: students
        });
    });
};
// Handle create students actions
exports.new = function (req, res) {
    var students = new Students();
    students.name = req.body.name ? req.body.name : students.name;
    students.score = req.body.score;

// save the students and check for errors
    students.save(function (err) {
    
res.json({
            message: 'New students created!',
            data: students
        });
    });
};

exports.average =function (req,res){
    res.json({
        message: 'New students yayyy!',
        data: students
    });
}