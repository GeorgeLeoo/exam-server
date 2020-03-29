#!/usr/bin/expect

set timeout 2000

spawn scp -r ./ root@139.159.201.22:/root/www

 expect {

 "(yes/no)?" {
    send "yes\n"
    expect "*assword:" { send "123loveyou,\n"}
  }

 "*assword:" {
    send "123loveyou,\n"
  }
}

expect "100%"

expect eof

#sudo cd /root/www/exam-server
#pm2 start server.bundle.js

