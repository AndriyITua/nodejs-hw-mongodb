const notFoundHandler = (req, res) => {
  res.status(404).json({
    message: `Route ${req.url} not found`,
  });
};

export default notFoundHandler;
