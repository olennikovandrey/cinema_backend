const Room = require("../models/room.model");

class roomController {
  async getExactRoom(req, res) {
    try {
      const requestId = req.params.id.split("=")[1];
      const currentRoom = await Room.findOne({ _id: requestId });
      return res.json({ currentRoom });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Что-то не так..." });
    }
  }
}

module.exports = new roomController()
