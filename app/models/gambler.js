'use strict';

var Mongo = require('mongodb'),
    _     = require('lodash');

function Gambler(o){
  this.name    = o.name;
  this.photo   = o.photo;
  this.spouse  = {name:o.spouse.name, photo:o.spouse.photo};
  this.money    = parseFloat(o.money);
  this.assets  = [];
  this.results = {wins:0, losses:0};
}

Object.defineProperty(Gambler, 'collection', {
  get: function(){return global.mongodb.collection('gamblers');}
});

Gambler.create = function(o, cb){
  var g = new Gambler(o);
  Gambler.collection.save(g, cb);
};

Gambler.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Gambler.collection.findOne({_id:_id}, function(err, g){
    cb(err, _.create(Gambler.prototype, g));
  });
};

Gambler.all = function(cb){
  Gambler.collection.find().toArray(cb);
};

//Loops over the assets in the array until it finds what it needs and then it takes it out of the
//array and puts it into the "var assets" array. It then sells the item by adding it to the money//
Gambler.prototype.sellAsset = function(name){
  var assets = _.remove(this.assets, function(asset){return asset.name === name;});
  this.money += assets[0].value;
};

Gambler.prototype.addAsset = function(o){
  var asset = {name:o.name, photo:o.photo, value:parseFloat(o.value)};
  this.assets.push(asset);
};

Gambler.prototype.save = function(cb){
  Gambler.collection.save(this, cb);
};

module.exports = Gambler;
