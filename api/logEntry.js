const express = require('express');
const Router = express.Router();

const User = require('../models/User');
const TravelLog = require('../models/TravelLog');
const verify = require('../verifyToken');
const mongoose = require('mongoose');

Router.get("/", verify, async (req, res) => {
    try {
        const logs = await TravelLog.findOne({ user_id: req.user._id });
        res.status(200).json(logs.logs);
    } catch (error) {
        res.status(400).json([]);
    }
});

Router.post("/", verify, async (req, res) => {
    const newEntry = {
        title: req.body.title,
        description: req.body.description,
        image: req.body.image ? req.body.image : null,
        rating: req.body.rating ,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        visitDate: req.body.visitDate
    };

    const exists = await TravelLog.findOne({
        user_id: req.user._id
    });

    if(exists) {
        const upadtedLog = await TravelLog.updateOne(
            { user_id: req.user._id },
            { $push: { logs: newEntry} }
        );
        return res.status(200).json(upadtedLog);
    }

    try {
        const createdLog = new TravelLog();
        createdLog.user_id = req.user._id;
        createdLog.logs.push(newEntry);      
        const savedLog = await createdLog.save();
        res.status(200).json(savedLog);
    } catch (error) {
        res.json(400).json({
            message: error
        });
    }
});

Router.delete("/", verify, async (req, res) => {
    const logID = req.body.logID;
    // console.log(userID + " and " + linkID);
    try {
      const deletedLink = await TravelLog.updateOne(
        { user_id: req.user._id },
        { $pull: { logs: { _id: logID } } },
        { new: true }
      );
      res.status(200).json(deletedLink);
    } catch (error) {
      res.status(400).json({
        message: error,
      });
    }
  });

module.exports = Router;