import nodemailer from "nodemailer";

export const sendEmail = async (email, subject, text) => {
  console.log({ email, subject, text });
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    console.log("yess");

    let mailOptions = {
      from: process.env.USER,
      to: email,
      subject: subject,
      text: text,
      // html: "<b>Hello world?</b>", // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return { message: "email" };
      } else {
        console.log("Message sent: %s", info.messageId);
      }
    });
    // console.log(send);
    return { message: "" };
  } catch (error) {
    console.log("email not sent!");
    console.log(error);
    return { message: "error" };
  }
};
