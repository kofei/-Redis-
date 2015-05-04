var express = require('express');
var redis = require('./models/redis.js');

var app = express();
app.use(express.bodyParser());

// 扔一个漂流瓶
// POST owner=xxx & type=xxx & content=xxx [&time=xxx]
app.post('/', function (req, res) {
	if (!(req.body.owner && req.body.type && req.body.content)) {
		if (req.body.type && (["male", "female"].indexOf(req.body.type) === -1)) {
			return res.json({code: 0, msg: "类型错误"});
		}
		return res.json({code: 0, msg: "信息不完整"});
	}
  redis.throw(req.body, function (result) {
  	res.json(result);
  });
});

// 捡一个漂流瓶
// GET /?user=xxx [&type=xxx]
app.get('/', function (req, res) {
	if(!req.query.user) {
		return res.json({code: 0, msg: "信息不完整"});
	}
	if (re.query.type && (["male", "female"].indexOf(req.query.type) === -1)) {
		return res.json({code: 0, msg: "类型错误"});
	}
	redis.pick(req.query, function (result) {
		if (result.code === 1) {
			mongodb.save(req.query.user, result.mag, function(err) {
				if(err) {
					return res.json({code: 0, mag: "获取漂流瓶失败，请重试"});
				}
				return res.json(result);
			});
		}
		res.json(result);
	});
});

//扔回海里一个漂流瓶
//POST owner = xxx & type=xxx & content=xxx & time=xxx
app.post('/back', function(req, res) {
	redis.throwBack(req.body, function(result) {
		res.json(result);
	});
});

//获取一个用户所用的漂流瓶
//GET /user/nswbnw
app.get('/user/:user', function(req, res) {
	mongodb.getAll(req.params.user, function(result) {
		res.json(result);
	});
});

//获取特定 ID 的漂流瓶
//GET /bottle/4565648687safghgjhjff
app.get('/bottle/:_id', function(req, res) {
	mongodb.getOne(req.params._id, function(result) {
		res.json(result);
	});
});

exports.getOne = function(_id, callback) {
	//通过 ID 获取特定的漂流瓶
	bottleModel.findById(_id, function(err, bottle) {
		if(err) {
			return callback({code: 0, msg: "读取漂流瓶失败..."});
		}
		callback({code: 1, msg: bottle});
	});
};

//回复特定 ID 的漂流瓶
//POST user = xxx & content=xxx & [&time=xxx]
app.post('/reply/:_id', function(req, res) {
	if (!(req.body.user && req.body.content)) {
		return callback({code: 0, msg: "回复信息不完整！"});
	}
	mongodb.reply(req.params._id, req.body, function(result) {
		res.json(result);
	});
});

app.listen(3000);
