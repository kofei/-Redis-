# -Redis-
1.接口设计  
  (1).以GET加参数的形式访问服务器，打捞一个漂流瓶，返回JSON数据：
    GET /?user = xxx[&type = xxx]   // type 漂流瓶类型（设置三种：all，male, female）
    // SUCCESS return
    // { "code": 1, msg: {"time": "...", "owner": "...", "type": "...", "content": "..."}}
    // ERROR return {"code": 0, "msg": "..."}
  (2).以POST形式请求服务器，扔出一个漂流瓶，返回JSON数据：
    POST owner = xxx & type=xxx & content=xxx [&time=xxx]
    // SUCCESS return {"code": 1, "msg": "..."}
    // ERROR return {"code": 0, "msg": "..."}
