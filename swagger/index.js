const express = require('express')
let path = require('path');
const app = express()


//Setting up server
var server = app.listen(process.env.PORT || 20106, function () {
    debugger
    var port = server.address().port;
    console.log("App now running on port", port);
    console.log("Continuing...");
});

app.use(express.static(path.join(__dirname, 'public')));
// 设置服务永不超时
server.setTimeout(0)