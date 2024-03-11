const TaskService = require('../services/TaskService');

exports.getEasyTasks = async (req, res) => {
  try {
    const tasks = await TaskService.getTasks('easy');
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getMediumTasks = async (req, res) => {
  try {
    const tasks = await TaskService.getTasks('medium');
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getHardTasks = async (req, res) => {
  try {
    const tasks = await TaskService.getTasks('hard');
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).send(err);
  }
};
