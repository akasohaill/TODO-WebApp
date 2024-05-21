import mongoose from 'mongoose'
const password=encodeURIComponent("@Todo.com")

export const ConnectDb=async ()=>{
    await mongoose.connect(`mongodb+srv://yasmin:${password}@cluster0.kuzeqyk.mongodb.net/todo`)
    console.log("Connected to DB");
}