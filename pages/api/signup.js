import initDB from "@/helpers/initDB";
import Signup from "@/model/Signup";
import bcrypt from "bcryptjs";

initDB();

export default async (req, res) => {
  const { Name, Email, Password } = req.body;
  try {
    if (!Name || !Email || !Password) {
      return res.status(422).json({ error: "Please Add all Fields" });
    }
    const user = await Signup.findOne({ email: Email });
    if (user) {
      return res.status(422).json({ error: "user already exists" });
    }
    const hashedPassword = await bcrypt.hash(Password, 12);
    const newUser = await new Signup({
      name: Name,
      email: Email,
      password: hashedPassword,
    }).save();
    // console.log(newUser);
    res.status(201).json({ message: "SignUp Success" });
  } catch (err) {
    console.log(err);
  }
};
