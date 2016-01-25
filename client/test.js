//var Centrifuge = require('centrifuge')

var secret = "e2199fe7-ebad-4124-a8fa-d6c95653aff9"
var user = "alfred"
var timestamp = parseInt(Math.round((new Date()).getTime() / 1000)).toString()

// Should not be here.
//var hmacBody = user + timestamp
//var shaObj = new jsSHA("SHA-256", "TEXT")
//shaObj.setHMACKey(secret, "TEXT")
//shaObj.update(hmacBody)
//var token = shaObj.getHMAC("HEX")

var centrifuge = new Centrifuge({
    url: 'ws://localhost:8000/connection/websocket'
    , user: user
    , timestamp: timestamp
    , "insecure": true
})


centrifuge.on('connect', function() {
    var id = centrifuge.getClientId()
    console.log("id: %s", id)
    
    centrifuge.subscribe("alfred", function(message) {
        console.log(message)
    });
});

centrifuge.on('disconnect', function(context) {
    // do whatever you need in case of disconnect from server
        console.log(context)
})

centrifuge.on('error', function (e) {
    console.log('errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrorrrrrrrrrrrrrrRR!!!')
})

centrifuge.connect()
