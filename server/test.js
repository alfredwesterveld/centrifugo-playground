// e2199fe7-ebad-4124-a8fa-d6c95653aff9

Client = require("jscent")

var options = {
    url: "http://localhost:8000", 
    secret: "e2199fe7-ebad-4124-a8fa-d6c95653aff9"
}

var c = new Client(options)

c.presence("alfred", function (err, resp) {
    if (err) {
        console.log("!!!!!!!!!!!1error!!!!!!!!!!!!: %j,", err)
    } else {
        console.log("resp: %j", resp)
    }
})

var msg = "test" + Date.now()
c.publish("alfred", msg, function (err, resp) {
    console.log(err, resp)
})
