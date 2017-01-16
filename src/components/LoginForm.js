
import * as React from "react";
import {doLogin} from '../utils/API'
import {Link, Route, Router, browserHistory} from 'react-router'

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {login: '', password: '', msg:''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.success = this.success.bind(this);
        this.fail = this.fail.bind(this);
    }

    success() {
       browserHistory.push("/inbox");
    }

    fail(error) {
        this.setState({msg: error});
    }
    handleSubmit(event) {
        let that = this;
        event.preventDefault();
        let user =  this.state.login;
        let pass =  this.state.password;
        doLogin(user,pass,this.success,this.fail);
    }

    handleChange = field => e => {
        e.preventDefault();
        let state = this.state;
        state[field] = e.target.value;
        this.setState(state);
    }

    componentDidMount() {
    }

    render() {
        return (<div>
                <br/>
                <br/>
                <br/>
                <form onSubmit={this.handleSubmit}>
                    Login: <input name="login" onChange={this.handleChange('login')} value={this.state.login} type="text"/>
                    <br/>
                    <br/>
                    Password: <input name="password" onChange={this.handleChange('password')} value={this.state.password} type="password"/>
                    <br/>
                    <br/>
                    <input type="submit"/>
                </form>
                <div><b>{this.state.msg}</b></div>
            </div>
        );
    }
}
