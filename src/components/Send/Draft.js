import * as React from "react";
import * as API from '../../utils/API'
import {Link, Route, Router, browserHistory} from 'react-router'
import MailSenderView from "./MailSenderView";
export default class Draft extends MailSenderView {

    constructor(props) {
        super(props);
        this.state.mailFetcher = API.fetchDrafts;
        this.handleTo = this.handleTo.bind(this);
        this.handleSubject = this.handleSubject.bind(this);
    }

    handleSubject(event) {
        let state = this.state;
        state.mail.subject  = event.target.value;
        this.setState(state);
    }

    handleTo(event) {
        let state = this.state;
        state.mail.rcvr  = event.target.value;
        this.setState(state);
    }

    sendSuccess() {
        API.deleteDraft(this.state.mailId,function(){alert("Mail sent from draft");browserHistory.push("/sent")});
    }

render() {
        let mail = this.state.mail;
        let subject = mail.subject;
        let content = mail.content;
        let to = mail.rcvr;
        return (
            <div>
                <div>Sending To : <input type="text" ref="to" value={to} onChange={this.handleTo}></input></div><br/><br/>
                <div>Subject: <input type="text" ref="subject" value={subject} onChange={this.handleSubject}/></div><br/><br/>
                <div ref="content" id="editable" contentEditable={true}>
                    {super.render()}
                </div>
                <br/>
                <br/>
                <button onClick={this.send}>Send</button>
                <br/>
                <button onClick={this.saveAsDraft}>Save As Draft</button>
                <br/>
                <br/>
            </div>

        );
    }
}



