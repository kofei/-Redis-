## 使用Redis搭建微博网站
>###**接口设计**

####以`GET`加参数的方式访问服务器，打捞一个漂流瓶，返回`JSON`数据:
``` node.js
GET /?user = xxx [type=xxx]
// SUCCESS return
// {"code: 1, msg: {"time": "...", "owner": "...", "type": "...", "content": "..."}}
// ERROR return {"code": 0, "msg": "..."}
```
#####`GET`参数
* `user:`捡漂流瓶的人的用户名或`ID`，必须唯一。
* `type:`漂流瓶类型，分三类：all， male， female
#####返回的`JSON`参数
* `code:`标识码，1表示成功，0表示失败。
* `mag:`返回的信息。
* `time:`漂流瓶扔出的时间戳。
* `owner:`漂流瓶主人，用户名或`ID`任意一个。
* `type:`类型，male或female。
* `content:`内容。
####以`POST`请求服务器，扔出一个漂流瓶，返回`JSON`数据：
``` node.js
POST owner = xxx & type=xxx & content=xxx [&time=xxx]
// SUCCESS return {"code": 1, "msg": "..."}
// ERROR return {"code": 0, "msg": "..."}
```
