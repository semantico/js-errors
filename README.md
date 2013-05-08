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

**Error message format:**

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
        // Optionally if modernizr object is available
        // If script has generated a guid send the modernizr object
        Array: modernizr
        [
            String: can, // "blob,boxshadow,...,svg"
            String: can't // "blobbuilder,download,...,touch"
        ]
        // If modernizr already sent, send a token indicating the server should try and get it from redis
        String: "m"
    ]

# Capturing errors

There are two error reporting flows:

## With localStorage

1. Error fires and ```onerror``` callback catches it
2. Error is logged in localStorage
3. More errors may fire repeating steps 1-2
4. Page reloads or another page on site is visited
5. Domready checks localStorage for errors
6. When it finds stored errors it sends them to the server

## Without localStorage

1. Error fires and ```onerror``` callback catches it
2. Error is sent to server
3. Second error event fires and a queue of error messages is created and a timer is started
4. When timer ends error queue is sent to server
5. If more errors happen after the timer goto 3

## Modernizr details

Modernizr is a feature detection library that we use on most sites to help progressively enhance our sites. This information about the browswers capabilities is very useful when debugging.

We parse the Modernizr object into an array of strings so that it is smaller when we send it to the server. We ignore and properties that are functions or begin with an underscore.

When a message is sent to the server we check the ```window.Modernizr``` object exists. If it does and it's the first message we have sent to the server we send this processed version of Modernizr. If it's not the first time we have sent it, we send a string ```"m"``` so that the server knows to pull the Modernizr object out of Redis.

## Sending messages

Some assumptions:

* Cross browser and backwards compatible
* Errors will need to be sent cross domain
* The length of the error message could be really large
* No information has to be returned from requests

We send get requests using an Image with a query string on the ```src``` attribute, and we send post requests with a hidden iframe containing a form.
