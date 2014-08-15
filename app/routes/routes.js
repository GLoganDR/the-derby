'use strict';

var morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    methodOverride = require('express-method-override'),
    home           = require('../controllers/home'),
    gamblers       = require('../controllers/gamblers');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(express.static(__dirname + '/../static'));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(methodOverride());

  app.get('/', home.index);

  app.get('/gamblers', gamblers.index);
  app.post('/gamblers', gamblers.create);
  app.get('/gamblers/new', gamblers.new);
  app.delete('/gamblers/:id/assets/:name', gamblers.sellAsset);
  app.get('/gamblers/:id/assets/new', gamblers.newAsset);
  app.put('/gamblers/:id/assets', gamblers.addAsset);

  console.log('Routes Loaded');
};
