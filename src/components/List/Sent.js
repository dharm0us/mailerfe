import * as React from "react";
import * as API from '../../utils/API'
import MailList,{MailDisplay} from './MailList'
import * as auth from '../../utils/auth'
export default class Sent extends MailList {

    constructor(props) {
        super(props);
        this.state.mailFetcher = API.fetchSentMails;
    }

//{"3":{"subject":"hi","content":"this is content user30 and user94","rcvr":["user4","user9"]}}
    render() {
        let rows = [];
        let displayMail;
        if(this.state.selectedMailId) {
            let sm = this.state.mails[this.state.selectedMailId];
            let from = auth.getUser();
            displayMail = <MailDisplay from={from} to={sm.rcvr} subject={sm.subject} content={sm.content}/>
        }
        Object.keys(this.state.mails).forEach(
            (mailId) => {
                let mail = this.state.mails[mailId];
                let row = <CustomRow key={mailId} to={mail.rcvr} subject={mail.subject} mailId={mailId} showMail={this.showMail}/>
                rows.push(row);
            }
        );
        return (
        <div>
                <table >
                    <thead>
                    <tr>
                        <th>To</th>
                        <th>Subject</th>
                        <th>Show</th>
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
            {displayMail}
            </div>
        );
    }
}

class CustomRow extends React.Component {
    render() {
        let to = this.props.to;
        let subject = this.props.subject;
        let mailId = this.props.mailId;
        let showMail = this.props.showMail;
        return (
            <tr>
                <td>{to}</td>
                <td>{subject}</td>
                <td><button onClick={function(){showMail(mailId)}}> Show </button></td>
            </tr>
        )
    }
}
