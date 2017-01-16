import * as React from "react";
import * as API from '../../utils/API'
import {Link, Route, Router, browserHistory} from 'react-router'
export default class MailSenderView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {includeAttachments: false, mailFetcher:null,mailId: this.props.params.mailId, mail: {}};
        this.handleMail = this.handleMail.bind(this);
        this.send = this.send.bind(this);
        this.saveAsDraft = this.saveAsDraft.bind(this);
        this.success = this.success.bind(this);
        this.error = this.error.bind(this);
        this.sendSuccess = this.sendSuccess.bind(this);
        this.sendError = this.sendError.bind(this);
        this.draftSuccess = this.draftSuccess.bind(this);
        this.draftError = this.draftError.bind(this);
        this.discard = this.discard.bind(this);
    }

    saveAsDraft() {
        let to = this.refs.to.value;
        let subject = this.refs.subject.value;
        let content = this.refs.content.innerHTML;
        API.saveAsDraft(to,subject,content,this.draftSuccess(),this.draftError());
    }

    send() {
        let to = this.refs.to.value;
        let subject = this.refs.subject.value;
        let content = this.refs.content.innerHTML;
        let attachments = [];
        if(this.state.includeAttachments) {
           let attachmentsObjects = this.state.mail.attachments;
           for(let i=0;i<attachmentsObjects.length;i++) {
               attachments.push(attachmentsObjects[i].id);
           }
        }
        API.sendMail(to,subject,content,this.sendSuccess(),this.sendError(),attachments);
    }

    sendError() {
        let func = function(msg) {
            this.error(msg);
        }
        return func.bind(this);
    }

    sendSuccess() {
        let func = function() {
            let msg = "Mail send success";
            let redir = "/sent";
            this.success(msg,redir);
        }
        return func.bind(this);
    }

    draftError() {
        let func = function(msg) {
            this.error(msg);
        }
        return func.bind(this);
    }

    draftSuccess() {
        let func = function() {
            let msg = "Mail draft success";
            let redir = "/drafts";
            this.success(msg,redir);
        }
        return func.bind(this);
    }

    discard() {
        browserHistory.push("/inbox");
    }

    success(msg,redir) {
        console.log(msg);
        console.log(redir);
        browserHistory.push(redir);
    }

    error(msg) {
        alert(msg);
    }

    handleMail(mails) {
        let mail = mails[this.state.mailId];
        this.setState({mail: mail})
    }

    componentDidMount() {
        if(this.state.mailFetcher) this.state.mailFetcher(this.handleMail, this.state.mailId);
    }

    footer() {
       return (
         <div>
             <br/>
             <br/>
             <button onClick={this.send}>Send</button>
             <br/>
             <button onClick={this.discard}>Discard</button>
             <br/>
             <button onClick={this.saveAsDraft}>Save As Draft</button>
             <br/>
             <br/>
             <br/>
             <br/>
         </div>
       ) ;
    }

    render() {
return (
        <div dangerouslySetInnerHTML={{__html: this.state.mail.content}}></div>
    );
    }



}



