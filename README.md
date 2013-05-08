# Set up

1. Install [node.js](http://nodejs.org/download/)
2. Install [foreman](http://ddollar.github.io/foreman/) ```gem install foreman```
3. Run the app ```foreman start```


# Environment variables

* ```PORT```
* ```REDIS_PORT```
* ```REDIS_HOST```
* ```ERROR_URL```
* ```PARAM```
* ```REFERER_PARAM```


# Error messages

Error messages are Arrays that are JSON.stringify'd and then sent as get or post requests.
Error message format:

    [
        String: guid, // From cookie or generated
        Array: errors
        [
            Array: error message
            [
                String: message
                String: script url
                Number: line number
            ]
        ],
        // Optional modernizr
        // If script has generated a guid send the modernizr object
        Array: modernizr
        [
            String: can, // "blob,boxshadow,...,svg"
            String: can't // "blobbuilder,download,...,touch"
        ]
        // If modernizr already sent, send a token indicating there is a modernizr ready to send
        String: "m"
    ]

