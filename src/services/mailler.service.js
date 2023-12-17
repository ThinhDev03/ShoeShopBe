import transporter from "../configs/transport.config";

export const sendMail = async ({ to, subject, html }) =>
  await transporter.sendMail(
    {
      from: {
        address: process.env.AUTH_EMAIL,
        name: "Web bán giày 7Sneaker",
      },
      to: to,
      subject: subject,
      html: html,
    },
    (err, info) => {
      if (err) console.log("Failed to send mail.\nError: ", err.message);
      else console.log(info.response);
    }
  );
