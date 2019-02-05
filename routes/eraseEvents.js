var express = require('express');
var router = express.Router();

const DAO = require('../infra/DAO');
const EventModel = require('../models/eventModel');
const ActorModel = require('../models/actorModel');
const RepoModel = require('../models/repoModel');

router.delete('/', function(req, res, next) {
    
    const dao = new DAO('./infra/github_events.db');
    const eventModel = new EventModel(dao);
    const actorModel = new ActorModel(dao);
    const repoModel = new RepoModel(dao);
    
    eventModel.deleteAll()
        .then(() => actorModel.deleteAll())
        .then(() => repoModel.deleteAll())
        .then(events => res.status(200).end())
        .catch(err => next(err));
});

module.exports = router;