import initDB from "@/helpers/initDB";
import Task from "@/model/Task";
import Jwt from "jsonwebtoken";

initDB();
export default async function handler(req, res) {
  if (req.method === "GET") {
    await getAllTasks(req, res);
  } 
}

async function getAllTasks(req, res) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "You must logged-in" });
  }
  try {
    const result = await Task.find().populate(
        "user"
      );
    // console.log(result);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
  }
}