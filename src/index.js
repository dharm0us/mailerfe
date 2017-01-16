import React  from 'react'
import * as ReactDOM from "react-dom";
import App from './components/App'
import {Route, Router, browserHistory,IndexRedirect} from 'react-router'
import './index.css';
import LoginForm from './components/LoginForm'
import Sent from './components/List/Sent'
import Inbox from './components/List/Inbox'
import Trash from './components/List/Trash'
import * as auth from './utils/auth'
import Reply from "./components/Send/Reply";
import Forward from "./components/Send/Forward";
import Drafts from "./components/List/Drafts";
import Draft from "./components/Send/Draft";
import Compose from "./components/Send/Compose";

function requireAuth(nextState, replace) {
    if (!auth.loggedIn()) {
        replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
        })
    }
}

let routes =
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRedirect to="/inbox"/>
            <Route path="/login" component={LoginForm}/>
            <Route path="/reply/:mailId" component={Reply}/>
            <Route path="/forward/:mailId" component={Forward}/>
            <Route path="/draft/:mailId" component={Draft}/>
            <Route path="/compose" component={Compose}/>
            <Route path="/inbox" component={Inbox} onEnter={requireAuth}/>
            <Route path="/drafts" component={Drafts} onEnter={requireAuth}/>
            <Route path="/sent" component={Sent} onEnter={requireAuth}/>
            <Route path="/trash" component={Trash} onEnter={requireAuth}/>
        </Route>
    </Router>;
ReactDOM.render((routes) , document.getElementById('root'));

