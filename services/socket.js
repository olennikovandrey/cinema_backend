const socketIO = require("socket.io");
const Cinema = require("../models/cinema.model");

exports.sio = server => {
  return socketIO(server, {
    transport: ["polling"],
    cors: {
      orogin: "*"
    }
  })
};

exports.connection = io => {
  io.on("connection", socket => {
    console.log(`User ${ socket.id } connected`);

    socket.on("disconnect", () => {
      console.log(`User ${ socket.id } disconnected`);
    });

    socket.on("seat select event", async ({ cinemaId, roomId, movieId }) => {
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
