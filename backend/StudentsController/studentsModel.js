var mongoose = require('mongoose');
// Setup schema
var studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    score: {
        type: String,
        required: true
    },
   
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export Student model
module.exports = mongoose.model('student', studentSchema);
