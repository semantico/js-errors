// JSON shim
// document ready shim - https://github.com/ded/domready/blob/master/src/ready.js

function guid() {

}

function getId() {

}

function setId() {

}

function hasLocalStorage() {
    try {
        return ('localStorage' in window && window['localStorage'] !== null);
    } catch (e) {
        return false;
    }
}

function parseModernizr() {

}

function isValid(msg) {

}

function rateLimit() {

}

function isLimited() {

}

function logError(msg, url, line) {

}

function get() {

}

function post() {

}

function send() {

}

function load() {
    // check localStorage and send if they are any
}

domReady(load);

