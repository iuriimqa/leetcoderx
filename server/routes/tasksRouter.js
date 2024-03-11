import { Router } from "express";
import express from 'express';
import taskController from '../controllers/taskControllers';

const taskrouter = express.Router();

const router = express.Router();


router.get('/tasks/easy', taskController.getEasyTasks);
router.get('/tasks/medium', taskController.getMediumTasks);
router.get('/tasks/hard', taskController.getHardTasks);

module.exports = router;
