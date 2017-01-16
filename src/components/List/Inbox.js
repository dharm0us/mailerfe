import * as React from "react";
import * as API from '../../utils/API'
import * as Constants from '../Constants'
import MailList,{MailDisplay} from './MailList'
import {Link, Route, Router, browserHistory} from 'react-router'
import * as auth from '../../utils/auth'
import * as SortUtils from "../../utils/SortUtils";
export default class Inbox extends MailList {

    constructor(props) {
        super(props);
        this.state.mailFetcher = API.fetchIncomingMails;
        this.markRead = this.markRead.bind(this);
        this.trash = this.trash.bind(this);
        this.handleMailStatusChange = this.handleMailStatusChange.bind(this);
    }

    trash(mailId) {
        API.trash(mailId,this.handleMailStatusChange);
    }

    markRead(mailId) {
        API.markRead(mailId,this.handleMailStatusChange);
    }

    handleMailStatusChange() {
        location.reload(true);
    }

    //[{"mailId":"4","subject":"hi","content":"this is content user30 and user94","sender":"user1","status":"unread"}]
    render() {
        let rows = [];
        let keys = SortUtils.sortByKeysNumericDesc(this.state.mails);
        let len = keys.length;
        for(let i = 0;i<len;i++) {
            let mailId = keys[i];

            let mail = this.state.mails[mailId];
            let row = <CustomRow key={mailId} sentTime={mail.sentTime} mailId={mailId} from={mail.sender} status={mail.status} subject={mail.subject}
                                 showMail={this.showMail} markRead={this.markRead} trash={this.trash}/>
            if(mail.status !== Constants.TRASHED) {
                rows.push(row);
            }
        }
        let displayMail;
        if(this.state.selectedMailId) {
            let sm = this.state.mails[this.state.selectedMailId];
            let to = auth.getUser();
            displayMail = <MailDisplay attachments={sm.attachments} from={sm.sender} to={to} subject={sm.subject} content={sm.content}/>
        }
        return (
            <div>
                <table >
                    <thead>
                    <tr>
                        <th>Mail Id</th>
                        <th>Date</th>
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
        let sentTime = this.props.sentTime;
        let subject = this.props.subject;
        let status = this.props.status;
        let showMail = this.props.showMail;
        let markRead = this.props.markRead;
        let trash = this.props.trash;
        let mailId = this.props.mailId;
        let replyURL = "/reply/"+this.props.mailId;
        let forwardURL = "/forward/"+this.props.mailId;
        return (
            <tr className={status===Constants.UNREAD?'boldrow':''}>
                <td>{mailId}</td>
                <td>{sentTime}</td>
                <td>{from}</td>
                <td>{subject}</td>
                <td>{status}</td>
                <td><button onClick={function(){showMail(mailId)}}> Show </button></td>
                <td><button onClick={function(){markRead(mailId)}}> Mark Read </button></td>
                <td><button onClick={function(){trash(mailId)}}> Trash </button></td>
                <td><Link to={replyURL}>Reply</Link></td>
                <td><Link to={forwardURL}>Forward</Link></td>
            </tr>
        )
    }
}
