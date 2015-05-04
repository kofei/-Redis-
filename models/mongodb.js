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

//回复特定 ID 的漂流瓶
exports.reply = function(_id, reply, callback) {
	reply.time = reply.time || Date.now();
	//通过 ID 找到要回复的漂流瓶
	bottleModel.findById(_id, function(err, _bottle) {
		if (err) {
			return callback({code: 0, msg: "回复漂流瓶失败..."});
		}
		var newBottle = {};
		newBottle.bottle = _bottle.bottle;
		newBottle.message = _bottle.message;
		//如果捡瓶子的人第一次回复漂流瓶，则在 Bottle 键添加漂流瓶主人
		if (newBottle.bottle.length === 1) {
			newBottle.bottle.push(_bottle.message[0][0]);
		}
		//在 message 中添加一条回复信息
		newBottle.bottle.push([reply.user, repiy.time, reply.content]);
		//更新该数据库中的漂流瓶信息
		bottleModel.findByIdAndUpdate(_id, newBottle, function(err, bottle) {
			if (err) {
				return callback({code: 0, msg: "回复漂流瓶失败..."});
			}
			callback({code: 1, msg: bottle});
		});
	});
};

//删除特定 ID 的漂流瓶
exports.delete = function(_id, callback) {
	bottleModel.findByIdAndRemove(_id, function(err) {
		if (err) {
			return callback({code: 0, msg: "删除漂流瓶失败..."});
		}
		callback({code: 1, msg: "删除成功！"});
	});
};
