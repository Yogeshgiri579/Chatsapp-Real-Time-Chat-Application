const attachSharedState = (onlineSockets, io) => (req, _res, next) => {
  req.onlineSockets = onlineSockets;
  req.io = io;
  next();
};

module.exports = { attachSharedState };
