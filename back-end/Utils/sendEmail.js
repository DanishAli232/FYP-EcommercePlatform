import nodemailer from "nodemailer";

export const sendEmail = async (email, subject, text) => {
  console.log({ email, subject, text });
  try {
    const transporter = nodemailer.createTransport({
      host: "nslookup smtp.gmail.com",
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE),
      tls: {
        rejectUnauthorized: true,
        minVersion: "TLSv1.2",
      },
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });
    console.log("yess");
    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: text,
    });
    console.log("yess1");
    // console.log(send);
    console.log("email sent successfully");
    return { message: "" };
  } catch (error) {
    console.log("email not sent!");
    console.log(error);
    return { message: "error" };
  }
};
