## 使用Redis搭建微博网站
>###**接口设计**

#####以`GET`加参数的方式访问服务器，打捞一个漂流瓶，返回`JSON`数据:
``` node.js
GET /?user = xxx [type=xxx]
// SUCCESS return
// {"code: 1, msg: {"time": "...", "owner": "...", "type": "...", "content": "..."}}
// ERROR return {"code": 0, "msg": "..."}
```
####`GET`参数
######-`GET:`

