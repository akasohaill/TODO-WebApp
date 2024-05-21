// Importing mongoose object from mongoose module
const { mongoose } = require('mongoose');

// Creating a new mongoose schema for todo items
const Schema = new mongoose.Schema({
    // Field for todo item title
    title: {
        type: String,
        required: true
    },
    // Field for todo item description
    description: {
        type: String,
        required: true
    },
    // Field for todo item completeness status
    isCompleted: {
        type: Boolean,
        default: false
    }
},
{
    // Option to include timestamps for creation and modification
    timestamps: true
});

// Creating a mongoose model for todo items based on the schema
const TodoModel = mongoose.models.todo || mongoose.model('todo', Schema);

// Exporting the TodoModel as default
export default TodoModel;
