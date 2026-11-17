const Room = require("../../models/Room/Room");
const { getSettlementsForRoom } = require("../../utils/settlements");
const { isMember } = require("../../utils/roompermissions");

const roomSettlementStatus = async (req, res) => {
  try {
    const room = await Room.findOne({ roomId: req.params.roomId });
    if (!room) return res.status(404).json({ message: "Room not found" });

    if (!isMember(room, req.user._id)) {
      return res.status(403).json({ message: "Access denied" });
    }

    const settlements = await getSettlementsForRoom(room);

    res.json({
      isSettled: settlements.length === 0,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { roomSettlementStatus };
