import * as React from "react";
import * as API from '../../utils/API'
import {Link, Route, Router, browserHistory} from 'react-router'
import MailSenderView from "./MailSenderView";
export default class Compose extends MailSenderView {

    constructor(props) {
        super(props);
    }


render() {
        return (
            <div>
                <div>Sending To : <input type="text" ref="to" placeholder="Recipients here..." ></input></div><br/><br/>
                <div>Subject: <input type="text" ref="subject"></input></div><br/><br/>
                <div ref="content" id="editable" contentEditable={true}>
                    <br/>
                    <br/>
                </div>
                <br/>
                <br/>
                Attachment: <input type="file"/>
                {this.footer()}
            </div>

        );
    }
}



