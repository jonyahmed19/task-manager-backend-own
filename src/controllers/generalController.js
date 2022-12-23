exports.healthCheck = async (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      data: "API is working fine",
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      data: err,
    });
  }
};
