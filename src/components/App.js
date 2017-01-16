import React, {Component} from 'react';
import {test} from '../utils/API'
import '../App.css';
import {Link, Route, Router, browserHistory} from 'react-router'
import * as auth from '../utils/auth'

const NavBar = () => {
    return (
        <div>
            <ul>
                <li><Link to="/sent">Sent</Link></li>
                <li><Link to="/inbox">Inbox</Link></li>
                <li><Link to="/trash">Trash</Link></li>
                <li><Link to="/drafts">Drafts</Link></li>
                <li><Link to="/compose">Compose</Link></li>
            </ul>
        </div>
    );
}



export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {loggedIn: false, mails: []}
        this.requireAuth = this.requireAuth.bind(this);
        this.logout = this.logout.bind(this);
        this.loginSuccess = this.loginSuccess.bind(this);
        this.loginFail = this.loginFail.bind(this);
    }

    requireAuth(nextState, replace) {
        console.log("requireAuth");
        console.log(this.state);
        if (!this.state.loggedIn) {
            replace({
                pathname: '/login'
            })
        }
    }

    loginFail() {
        this.state.loggedIn = false;
    }

    loginSuccess() {
        console.log("login success");
        this.setState({loggedIn: true});
        //browserHistory.push("/inbox");
    }

    logout() {
        auth.logout();
    }

    greeting() {
        if (auth.loggedIn()) {
            let user = auth.getUser();
            return (
                <div id="greeting">
                    Welcome {user}
                    <br/>
                    <button onClick={this.logout}>Logout</button>
                    <br/>
                    <NavBar />
                </div>
            );
        } else {
            return null;
        }
    }

    render() {
        console.log("App render");
        return (
            <div>
                {this.greeting()}
                {this.props.children}
            </div>
        );
    }

}
