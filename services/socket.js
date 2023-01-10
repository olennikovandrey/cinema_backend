const socketIO = require("socket.io");
const Cinema = require("../models/cinema.model");
const schedule = require("node-schedule");

exports.sio = server => {
  return socketIO(server, {
    transport: ["polling"],
    cors: {
      orogin: "*"
    }
  })
};

exports.connection = io => {
  const fiveMinutes = /* 5 * 60 * 1000 */ 5000;
  const startTime = new Date(Date.now() + fiveMinutes);
  const endTime = new Date(startTime.getTime() + fiveMinutes + 1500);

  io.on("connection", socket => {
    console.log(`User ${ socket.id } connected`);

    socket.on("disconnect", () => {
      console.log(`User ${ socket.id } disconnected`);
    });

    socket.on("seat select event", async ({ cinemaId, roomId, movieId }) => {
      console.log("sdhfjksdgfhg")
      const workSession = await Cinema.find({
        _id: cinemaId
      },
      {
        sessions: { $elemMatch: {
          roomId: roomId,
          movieId: movieId
        } }
      });
      const session = workSession[0].sessions[0];

      io.emit("seat select event", session);
    });
  });
};
