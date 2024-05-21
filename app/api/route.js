// Importing the NextResponse class from the next/server module
import { NextResponse } from "next/server";
// Importing the ConnectDb function from the db configuration file
import { ConnectDb } from "../lib/config/db";
// Importing the TodoModel class from the TodoModel module
import TodoModel from "../lib/model/TodoModel";

// Defining an asynchronous function to load the database connection
const LoadDb = async () => {
    // Connecting to the database
    await ConnectDb();
}

// Calling the LoadDb function to establish a database connection
LoadDb();

// Exported function to handle HTTP GET requests
export async function GET(request){
    // Finding all todos from the TodoModel and returning them as JSON response
    const todos = await TodoModel.find({});
    return NextResponse.json({todos:todos})
}

// Exported function to handle HTTP POST requests
export async function POST(request){
    // Parsing the JSON request body to extract title and description
    const {title,description} = await request.json();
    // Creating a new todo in the database with the provided title and description
    await TodoModel.create({
        title,
        description
    })
    // Returning a JSON response indicating successful creation of the todo
    return NextResponse.json({msg:"Todo Created"})
}

// Exported function to handle HTTP DELETE requests
export async function DELETE(request){
    // Extracting the todo ID from the query parameters
    const mongoID = await request.nextUrl.searchParams.get('mongoId')
    // Deleting the todo with the given ID from the database
    await TodoModel.findByIdAndDelete(mongoID)
    // Returning a JSON response indicating successful deletion of the todo
    return NextResponse.json({msg:"Todo Deleted"})
}

// Exported function to handle HTTP PUT requests
export async function PUT(request){
    // Extracting the todo ID from the query parameters
    const mongoID = await request.nextUrl.searchParams.get('mongoId')
    // Updating the todo with the given ID to mark it as completed
    await TodoModel.findByIdAndUpdate(mongoID,{
        $set:{
            isCompleted:true
        }
    })
    // Returning a JSON response indicating successful completion of the todo
    return NextResponse.json({msg:"Todo Marked as Completed"})
}
