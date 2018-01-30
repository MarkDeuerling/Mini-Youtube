/** This module defines the routes for videos using a mongoose model
 *
 * @author Johannes Konert
 * extended by Mark Deuerling, Jörg Kandziora, Evgenij Relin
 * @licence CC BY-SA 4.0
 *
 * @module routes/videos
 * @type {Router}
 */

// remember: in modules you have 3 variables given by CommonJS
// 1.) require() function
// 2.) module.exports
// 3.) exports (which is module.exports)

// modules
var express = require('express');
var logger = require('debug')('me2u5:videos');

// TODO add here your require for your own model file
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');
var modelVideo = require('../models/video');

var videos = express.Router();


// routes **********************
videos.route('/')
    .get(function(req, res, next) {
        // TODO replace store and use mongoose/MongoDB
        // res.locals.items = store.select('videos');
        modelVideo.find({}, function(err, video){
            res.json(video);
        });

        //res.locals.processed = true;
        //next();
    })
    .post(function(req,res,next) {
        req.body.timestamp = new Date().getTime();
        // TODO replace store and use mongoose/MongoDB
        // var id = store.insert(storeKey, req.body);

        var vid = new modelVideo(req.body);
        vid.save(function(err){
            if(!err){
                res.status(201).json(vid);
            } else{
                err.status = 400;
                err.message += ' in fields: ' + Object.getOwnPropertyNames(err.errors);
            }

            next(err);
        });

        //res.status(201);
        //
        //// TODO replace store and use mongoose/MongoDB
        //// res.locals.items = store.select(storeKey, id);
        //res.locals.processed = true;
        //next();
    })
    .all(function(req, res, next) {
        if (res.locals.processed) {
            next();
        } else {
            // reply with wrong method code 405
            var err = new Error('this method is not allowed at ' + req.originalUrl);
            err.status = 400;
            next(err);
        }
    });

videos.route('/:id')
    .get(function(req, res,next) {
        // TODO replace store and use mongoose/MongoDB
        // res.locals.items = store.select('videos', req.params.id);
        //modelVideo.find({_id:req.params.id}, function(err, video){
        //    res.json(video);
        //});
        modelVideo.findById(req.params.id, function(err, video){
            res.json(video);
        });
        //res.locals.processed = true;
        //next();
    })
    .put(function(req, res,next) {
        var id = parseInt(req.params.id);
        var bodyId = parseInt(req.body.id);

        if (id === bodyId) {
            // TODO replace store and use mongoose/MongoDB
            modelVideo.findById(req.params.id, function(err, video){
                if (err) {
                    var err = new Error('can not put');
                    err.status = 400;
                    next(err);
                }else {
                    //loop through schema
                    for(var attr in modelVideo.schema.paths){
                        // loop through request body
                        for(var battr in req.body){
                            if(battr == attr){
                                battr = attr;
                            }
                        }
                    }
                    req.body.src = video.src;
                    req.body.length = video.length;
                    var vid = new modelVideo(req.body);
                    vid.save(function(err){
                        if(!err){
                            res.status(201).json(vid);
                        } else {
                            err.status = 400;
                            err.message += ' in fields: ' + Object.getOwnPropertyNames(err.errors);
                        }

                        next(err);
                    });

                    //res.status(200);
                    //res.locals.processed = true;
                    //next();
                }
            });

            // store.replace(storeKey, req.body.id, req.body);

            //res.status(200);
            //res.locals.items = store.select(storeKey, id);
            //res.locals.processed = true;
            //next();
        }
        else {
            var err = new Error('id of PUT resource and send JSON body are not equal ' + req.params.id + " " + req.body.id);
            err.status = 400;
            next(err);
        }
    })
    .delete(function(req,res,next) {
        var id = parseInt(req.params.id);

        // TODO replace store and use mongoose/MongoDB
        // store.remove(storeKey, id);

        // ...
        //    var err = new Error('No element to delete with id ' + req.params.id);
        //    err.status = codes.notfound;
        //    next(err);
        // ...

        modelVideo.findByIdAndRemove(req.params.id, function(err, video){
            if (err) {
                var err = new Error('can not delete');
                err.status = 400;
                next(err);
            }else {
                res.status(200);
                res.locals.processed = true;
                next();
            }
        });
        //res.locals.processed = true;
        //next();


    })
    .patch(function(req,res,next) {
        // TODO replace these lines by correct code with mongoose/mongoDB
        modelVideo.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, video) {
            if (err) {
                var err = new Error('can not patch');
                err.status = 400;
                next(err);
            } else {
                res.status(200);
                res.locals.items = video;
                res.locals.processed = true;
                next();
            }
        });
        //var err = new Error('Unimplemented method!');
        //err.status = 500;
        //next(err);
    })

    .all(function(req, res, next) {
        if (res.locals.processed) {
            next();
        } else {
            // reply with wrong method code 405
            var err = new Error('this method is not allowed at ' + req.originalUrl);
            err.status = 400;
            next(err);
        }
    });


// this middleware function can be used, if you like or remove it
// it looks for object(s) in res.locals.items and if they exist, they are send to the client as json
videos.use(function(req, res, next){
    // if anything to send has been added to res.locals.items
    if (res.locals.items) {
        // then we send it as json and remove it
        res.json(res.locals.items);
        delete res.locals.items;
    } else {
        // otherwise we set status to no-content
        res.set('Content-Type', 'application/json');
        res.status(204).end(); // no content;
    }
});

module.exports = videos;