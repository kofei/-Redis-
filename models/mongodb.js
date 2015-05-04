var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/drifter');

//定义漂流瓶模型，并设置数据存储到 bottles 集合
var bottleModel = mongoose.model('Bottle', new mongoose.Schema({
  bottle: Array,
  message: Array
},{
  collection: 'bottles'
}));

//用户捡到漂流瓶改变保存格式
exports.save = function(picker, _bottle, callback) {
  var bottle = {bottle: [], messsage: []};
  bottle.bottle.push(picker);
  bottle.message.push([_bottle.owner, _bottle.time, _bottle.content]);
  bottle = new bottleModel(bottle);
  bootle.save(function(err) {
    callback(err);
  });
};

//获取用户捡到的所有漂流瓶
exports.getAll = function(user, callback) {
  bottleModel.find({"bottle": user}, function(err, bottle) {
    if(err) {
      return callback({code: 0, msg: "获取漂流瓶列表失败..."});
    }
    callback({code: 1, msg: bottles});
  });
};
