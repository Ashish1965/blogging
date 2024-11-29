import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;
const taskSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: "signup",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date : {
    type:String,
    required:true,
  }
});

export default mongoose.models.task ||
  mongoose.model("task", taskSchema);
