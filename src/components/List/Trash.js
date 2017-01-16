import * as React from "react";
import * as API from '../../utils/API'
import * as Constants from '../Constants'
import MailList,{MailDisplay} from './MailList'
import {Link, Route, Router, browserHistory} from 'react-router'
export default class Trash extends MailList {

    constructor(props) {
        super(props);
        this.state.mailFetcher = API.fetchIncomingMails;
    }


    //[{"mailId":"4","subject":"hi","content":"this is content user30 and user94","sender":"user1","status":"unread"}]
    render() {
        let rows = [];
        Object.keys(this.state.mails).forEach(
            (mailId) => {
                let mail = this.state.mails[mailId];
                let row = <CustomRow key={mailId} mailId={mailId} from={mail.sender} status={mail.status} subject={mail.subject} showMail={this.showMail}/>
                if(mail.status === Constants.TRASHED) {
                    rows.push(row);
                }
            }
        );
        let displayMail;
        if(this.state.selectedMailId) {
            let sm = this.state.mails[this.state.selectedMailId];
            displayMail = <MailDisplay from={sm.sender} subject={sm.subject} content={sm.content}/>
        }
        return (
            <div>
                <table >
                    <thead>
                    <tr>
                        <th>From</th>
                        <th>Subject</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows}
                    </tbody></table>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                {displayMail}
            </div>
        );
    }
}

class CustomRow extends React.Component {
    render() {
        let from = this.props.from;
        let subject = this.props.subject;
        let status = this.props.status;
        let showMail = this.props.showMail;
        let mailId = this.props.mailId;
        return (
            <tr>
                <td>{from}</td>
                <td>{subject}</td>
                <td>{status}</td>
                <td><button onClick={function(){showMail(mailId)}}> Show </button></td>
            </tr>
        )
    }
}
