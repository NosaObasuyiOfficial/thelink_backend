import { Request, Response } from "express"
import { subscribeUser } from "../utilities/inputValidation";
import { emailHtmlForUser, sendmail } from "../utilities/notification"
import dotenv from 'dotenv'

dotenv.config()

export const subscribe = async(req: Request, res: Response)  => {
    try{
        const schema = subscribeUser
        const { error } = schema.validate(req.body);
        if (error) {
          res.status(400).json({ message: error.details[0].message });
        }else{

            const { email } = req.body

            const html = emailHtmlForUser();
            await sendmail(
              `${process.env.DEV_GMAIL_USER}`,
              email,
              "Thank You for Subscribing! Stay Tuned for Exciting Updates from The Link PR and Marketing Solutions",
              html
            );

            res.status(200).send("Subscribed!")
        }
    }catch(error){
        console.error("Error subscribing:", error);
         res.status(500).json({ error: "Internal server error - Error subscribing" });
    }
}

// import fs from "fs"; 
// import path from "path" 
// const thedatabasefolder = path.join("/Users/mac/Desktop/PR_and_Marketng_BACKEND/src", "database");

// const thedatabasefile = path.join(thedatabasefolder, "database.json");

// // Create database folder and file asynchronously
// if (!fs.existsSync(thedatabasefolder)) {
//   fs.mkdirSync(thedatabasefolder);
// }

// if (!fs.existsSync(thedatabasefile)) {
//   fs.writeFileSync(thedatabasefile, "[]"); // Initialize with empty array
// }

// // Read and update the database file
// fs.readFile(thedatabasefile, "utf-8", (err, data) => {
//   if (err) {
//     return res.status(500).json({
//       success: false,
//       error: "Failed to read database file.",
//     });
//   }

//   let subscribersList = [];
//   try {
//     subscribersList = JSON.parse(data); // Parse the existing data
//   } catch (parseError) {
//     subscribersList = []; // Fallback to an empty array on parse error
//   }

//   const ifEmailExists = subscribersList.some((list: any) => list == email )
//   // Add new subscriber
//   if(!ifEmailExists){
//     subscribersList.push(email)
//   }

//   // Write updated data back to the file
//   fs.writeFile(
//     thedatabasefile,
//     JSON.stringify(subscribersList, null, 2),
//     "utf-8",
//     (writeErr) => {
//       if (writeErr) {
//         return res.status(500).json({
//           success: false,
//           error: "Failed to update database file.",
//         });
//       }

//       return res.status(200).json({
//         success: true,
//         message: "Subscribed!",
//       });
//     }
//   );
// });