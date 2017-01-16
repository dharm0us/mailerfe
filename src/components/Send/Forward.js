import * as React from "react";
import MailSenderView from "./MailSenderView";
import * as API from "../../utils/API";
export default class Forward extends MailSenderView {

    constructor(props) {
        super(props);
        this.state.mailFetcher = API.fetchIncomingMails;
        this.state.includeAttachments = true;
        this.handleSubject = this.handleSubject.bind(this);
    }

    handleMail(mails) {
        let mail = mails[this.state.mailId];
        mail.subject = "Fwd: " + mail.subject;
        this.setState({mail: mail})
    }

    handleSubject(event) {
        let state = this.state;
        state.mail.subject = event.target.value;
        this.setState(state);
    }

    render() {
        let mail = this.state.mail;
        let subject = mail.subject;

        let ats = [];
        if (mail.attachments) {
            let attachments = mail.attachments;
            let len = attachments.length;
            for (let i = 0; i < len; i++) {
                let aid = attachments[i].id;
                let name = attachments[i].name;
                let a = <div> <b>Including Attachment :</b>{name}<br/></div>;
                ats.push(a);
            }
        }
        return (
            <div>
                <div>Forwarding To : <input type="text" ref="to" placeholder="Recipients here..."></input></div>
                <br/><br/>
                <div>Subject: <input ref="subject" value={subject} type="text" onChange={this.handleSubject}></input>
                </div>
                <br/><br/>
                <div ref="content" id="editable" contentEditable={true}>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    --------------Forward Seperator------------------------
                    <br/>
                    <br/>
                    <br/>
                    <div>
                        {super.render()}
                    </div>
                </div>
                {ats}
                {this.footer()}
            </div>

        );
    }
}



