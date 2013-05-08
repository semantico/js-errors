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
        String: guid,
        Array: errors
        [
            Array: message
            [
                String: message
                String: script url
                Number: line number
            ]
        ],
    ]

