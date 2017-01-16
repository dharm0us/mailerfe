import * as React from "react";
import * as API from '../../utils/API'
import * as Constants from '../Constants'
import MailList,{MailDisplay} from './MailList'
import {Link, Route, Router, browserHistory} from 'react-router'
import * as auth from '../../utils/auth'
export default class Drafts extends MailList {

    constructor(props) {
        super(props);
        this.state.mailFetcher = API.fetchDrafts;
        this.deleter = this.deleter.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        location.reload(true);
    }

    deleter(draftId) {
        API.deleteDraft(draftId,this.handleDelete);
    }


    //[{"mailId":"4","subject":"hi","content":"this is content user30 and user94","sender":"user1","status":"unread"}]
    render() {
        let rows = [];
        Object.keys(this.state.mails).forEach(
            (mailId) => {
                let mail = this.state.mails[mailId];
                let row = <CustomRow key={mailId} mailId={mailId} subject={mail.subject}
                                     showMail={this.showMail} deleter={this.deleter} to={mail.rcvr} updatedAt={mail.updatedAt}/>
                if(mail.status !== Constants.TRASHED) {
                    rows.push(row);
                }
            }
        );
        let displayMail;
        if(this.state.selectedMailId) {
            let sm = this.state.mails[this.state.selectedMailId];
            let from = auth.getUser();
            displayMail = <MailDisplay from={from} to={sm.rcvr} subject={sm.subject} content={sm.content}/>
        }
        return (
            <div>
                <table >
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>To</th>
                        <th>Subject</th>
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
        let to = this.props.to;
        let updatedAt = this.props.updatedAt;
        let subject = this.props.subject;
        let showMail = this.props.showMail;
        let deleter = this.props.deleter;
        let mailId = this.props.mailId;
        let url = "/draft/"+mailId;
        return (
            <tr>
                <td>{updatedAt}</td>
                <td>{to}</td>
                <td>{subject}</td>
                <td><button onClick={function(){showMail(mailId)}}> Show </button></td>
                <td><button onClick={function(){deleter(mailId)}}> Delete </button></td>
                <td><Link to={url}> Resume </Link></td>
            </tr>
        )
    }
}
