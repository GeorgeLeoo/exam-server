class ResponseCode {}

ResponseCode.SUCCESS = 200  // 成功
ResponseCode.CLIENT_ERROR = 402  // 失败，参数不正确
ResponseCode.SERVER_ERROR = 500  // 服务器错误
ResponseCode.UNAUTHORIZED = 401  // 没有权限,未登陆

export default ResponseCode
