import { transporter } from "../config/nodemailer";
import { IUser } from "../model/userSchema";
import dotenv from "dotenv";
import ejs from "ejs";
dotenv.config();
import path from "path";

export const welcomeUser = async (user: IUser) => {
  try {
    let emailHtml = await ejs.renderFile(
      path.join(__dirname, "../views/welcomeEmailHtml.ejs"),
      { user: "krishna" }
    );
    const options = {
      from: process.env.USER_EMAIL,
      to: user.email,
      subject: "Hello user",
      html: emailHtml,
    };
    await transporter.sendMail(options);
  } catch (error) {
    console.error(`error in welcoming user ${error}`);
  }
};
