import * as React from "react";
import * as API from '../../utils/API'
import * as SortUtils from "../../utils/SortUtils";
import * as Constants from "../Constants";
import * as auth from "../../utils/auth";

export default class MailList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {mailFetcher:null,selectedMailId:null,mails:[]};
        this.handleMails = this.handleMails.bind(this);
        this.showMail = this.showMail.bind(this);
    }

    showMail(mailId) {
        this.setState({selectedMailId: mailId})
    }
    handleMails(mails) {
        this.setState({mails: mails})
    }

    componentDidMount() {
        this.state.mailFetcher(this.handleMails);
    }

}

export class MailDisplay extends React.Component {
    render() {
        let from = this.props.from;
        let to = this.props.to;
        let subject = this.props.subject;
        let content = this.props.content;
        let ats = [];
        if(this.props.attachments) {
            let attachments = this.props.attachments;
            let len = attachments.length;
            for (let i = 0; i < len; i++) {
                let aid = attachments[i].id;
                let name = attachments[i].name;
                let url = "http://" + Constants.ENDPOINT + "/?aid=" + aid + "&module=mail&action=downloadAttachment&access_token=" + auth.getToken();
                let link = <div><a href={url}> Download {name}</a><br/></div>;
                ats.push(link);
            }
        }
        return (
            <div>
                From: {from}<br/><br/>
                To: {to}<br/><br/>
                Subject: {subject}<br/><br/>
                Content: <div dangerouslySetInnerHTML={{__html: content}}></div>
                <br/>
                <br/>
                <br/>
                {ats}
                <br/>
                <br/>
                <br/>
            </div>
        )
    }
}

