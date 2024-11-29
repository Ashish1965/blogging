import initDB from "@/helpers/initDB";
import Task from "@/model/Task";


initDB();
export default async function handler(req, res) {
  if (req.method === "GET") {
    await getUserSpecificTasks(req, res);
  } 
}

async function getUserSpecificTasks(req, res) {
  
    const { tid } = req.query;
    try {
      const product = await Task.findOne({ _id: tid }).populate(
        "user"
      );
      res.status(200).json(product);
      // console.log(product);
    } catch (err) {
      console.log(err);
    }
}
