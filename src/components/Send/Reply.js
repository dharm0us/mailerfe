import * as React from "react";
import MailSenderView from "./MailSenderView";
import * as API from "../../utils/API";
export default class Reply extends MailSenderView {

    constructor(props) {
        super(props);
        this.state.mailFetcher = API.fetchIncomingMails;
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
        state.mail.sender  = event.target.value;
       this.setState(state);
    }

    handleMail(mails) {
        let mail = mails[this.state.mailId];
        mail.subject = "Re: "+mail.subject;
        this.setState({mail: mail})
    }

    render() {
        let mail = this.state.mail;
        let subject = mail.subject;
        let content = mail.content;
        let sender = mail.sender;
        return (
            <div>
                <div>Sending To : <input type="text" ref="to" value={sender} onChange={this.handleTo}/></div><br/><br/>
                <div>Subject: <input type="text" ref="subject" value={subject} onChange={this.handleSubject}/></div><br/><br/>
                <div ref="content" id="editable" contentEditable={true}>
                    <br/>
                    <br/>
                    <br/>
                    <div contentEditable={true} placeholder="Your message here..."></div>
                    <br/>
                    <blockquote>
                        {super.render()}
                        </blockquote>
                </div>
                {this.footer()}
            </div>

        );
    }

}



