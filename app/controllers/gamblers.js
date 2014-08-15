'use strict';

var Gambler = require('../models/gambler');

exports.index = function(req, res){
  Gambler.all(function(err, gamblers){
    res.render('gamblers/index', {gamblers:gamblers});
  });
};

exports.create = function(req, res){
  Gambler.create(req.body, function(){
    res.redirect('/gamblers');
  });
};

exports.newAsset = function(req, res){
  res.render('gamblers/new-asset', {id:req.params.id});
};

exports.addAsset = function(req, res){
  Gambler.findById(req.params.id, function(err, gambler){
    gambler.addAsset(req.body);
    gambler.save(function(){
      res.redirect('/gamblers');
    });
  });
};

exports.sellAsset = function(req, res){
  Gambler.findById(req.params.id, function(err, gambler){
    gambler.sellAsset(req.params.name);
    gambler.save(function(){
      res.send({id:req.params.id, name:req.params.name, isDivorced:!!!gambler.assets.length, money:gambler.money});
    });
  });
};

exports.new = function(req, res){
  res.render('gamblers/new');
};
