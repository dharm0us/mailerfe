import React, {Component} from 'react';
import {Link, Route, Router, browserHistory} from 'react-router'
module.exports = {
    getToken() {
        return localStorage.token
    },

    getUser() {
        return localStorage.user
    },
    logout(cb) {
        delete localStorage.token;
        delete localStorage.user;
        if (cb) cb();
        browserHistory.push("/login");
    },

    loggedIn() {
        return !!localStorage.token
    },

}
