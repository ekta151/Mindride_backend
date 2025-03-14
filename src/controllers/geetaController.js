const geetaThoughts = require('../geetaThoughts.json'); // Import the JSON data

const getRandomThought = (req, res) => {
  const randomIndex = Math.floor(Math.random() * geetaThoughts.length);
  res.json(geetaThoughts[randomIndex]);
};

module.exports = {
  getRandomThought,
}; 