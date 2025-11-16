const Counter = require("../models/Counter");

// Ensure a counter document exists
async function getOrCreateCounter() {
  let counter = await Counter.findOne();
  if (!counter) {
    counter = await Counter.create({ count: 0 });
  }
  return counter;
}

exports.incrementCounter = async (req, res) => {
  try {
    const counter = await getOrCreateCounter();

    counter.count += 1;
    await counter.save();

    res.json({
      success: true,
      message: "Counter incremented successfully",
      count: counter.count
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.resetCounter = async (req, res) => {
  try {
    const counter = await getOrCreateCounter();

    counter.count = 0;
    await counter.save();

    res.json({
      success: true,
      message: "Counter reset to 0",
      count: counter.count
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getCounter = async (req, res) => {
  try {
    const counter = await getOrCreateCounter();

    res.json({
      success: true,
      count: counter.count
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
