import express from "express";
import morgan from "morgan";
import cors from "cors";
import error from "../middlewares/error.js";
// import routes from the routes folder
import example from "../routes/example.js";
import userRoutes from "../routes/UserRoutes.js";
import bookRoutes from "../routes/BookRoutes.js";
import borrowbookRoutes from "../routes/BorrowBookRoutes.js";
import studyRoomRoutes from "../routes/StudyRoomRoutes.js";
import reservationRoutes from "../routes/ReservationRoutes.js";
import books from "../routes/books.js";

export default function (app) {
  // enable cross origin resource sharing middleware
  app.use(
    cors({
      // allow any origin
      origin: "*",
      // enable cookies or HTTP authentication
      credentials: true,
    })
  );
  // enable parse incoming requests with JSON payloads
  app.use(express.json());
  // enable parse incoming requests with URL-encoded payloads
  app.use(express.urlencoded({ extended: true }));
  // logging http requests with morgan
  app.use(morgan("tiny"));
  // serve static files from the public directory
  app.use(express.static("public"));

  // assign route paths
  app.use("/example", example);
  app.use("/api/users", userRoutes);
  app.use("/api/books", bookRoutes);
  app.use("/api/borrowbook", borrowbookRoutes);
  app.use("/api/studyrooms", studyRoomRoutes);
  app.use("/api/reservations", reservationRoutes);
    // assign route paths
    app.use("/books", books);


  // initialize error middleware
  app.use(error);
}
