// mongo db
const DB_URL = 'mongodb://root:123loveyou,@139.159.201.22:12306/exam?authSource=admin'

// redis
const REDIS = {
  host: '139.159.201.22',
  port: 15001,
  password: '123loveyou,'
}

// jwt
const JWT_SECRET = 'a&*38QthAK8ui2RwISGLotgq^3%^$zvA3A6Hfr8MF$jM*HY4*dWcwAW&9NGp7*b53!'

//  token 过期时间
const TOKEN_EXP = Math.floor(Date.now() / 1000) + 60 * 60 * 24

//  不用授权的api
const UN_AUTHENTICATION = [/\/users\/login/, /\/users\/register/]

export default {
  DB_URL,
  REDIS,
  JWT_SECRET,
  UN_AUTHENTICATION,
  TOKEN_EXP
}
