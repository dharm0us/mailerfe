import {ENDPOINT} from '../components/Constants'
import * as auth from './auth'

function commonErrorHandler(error,callback) {
    if(error.startsWith('auth_error')) {
        auth.logout();
    } else {
        if(callback) callback(error);
        else alert(error);
    }
}

export function fetchDrafts(success,draftId) {
    let url = 'http://'+ENDPOINT + "?module=mail&action=fetchDrafts&access_token="+auth.getToken();
    if(draftId) {
        url += "&draftId="+draftId;
    }
    fetch(url, {
        method: 'GET'
    }).then(function (response) {
        return response.json()
    }).then(function (resp) {
        console.log(resp);
        if(resp.error) {
            commonErrorHandler(resp.error);
        } else {
            success(resp);
        }
    })

}
export function fetchIncomingMails(success,mailId) {
    let url = 'http://'+ENDPOINT + "?module=mail&action=fetchIncomingMails&access_token="+auth.getToken();
    if(mailId) {
        url += "&mailId="+mailId;
    }
    fetch(url, {
        method: 'GET'
    }).then(function (response) {
        return response.json()
    }).then(function (resp) {
        console.log(resp);
        if(resp.error) {
            commonErrorHandler(resp.error);
        } else {
            success(resp);
        }
    })

}

export function fetchSentMails(success) {
    let url = 'http://'+ENDPOINT + "?module=mail&action=fetchSentMails&access_token="+auth.getToken();
    fetch(url, {
        method: 'GET'
    }).then(function (response) {
        return response.json()
    }).then(function (resp) {
        console.log(resp);
        if(resp.error) {
            commonErrorHandler(resp.error);
        } else {
            success(resp);
        }
    })

}

export function markRead(mailId,success) {
    changeMailStatus(mailId,'read',success);
}

export function trash(mailId,success) {
   changeMailStatus(mailId,'trashed',success);
}

export function deleteDraft(draftId,success) {
    let formData = new FormData();
    formData.append('draftId',draftId)
    formData.append('access_token',auth.getToken())
    let url = 'http://'+ENDPOINT + "?module=mail&action=deleteDraft";
    fetch(url, {
        method: 'POST',
        body: formData,
        credentials: 'include'
    }).then(function (response) {
        return response.json()
    }).then(function (resp) {
        console.log(resp);
        if(resp.error) {
            commonErrorHandler(resp.error);
        } else {
            success();
        }
    })
}
export function saveAsDraft(to,subject,content,success,fail) {
    let formData = new FormData();
    formData.append('to',to)
    formData.append('subject',subject)
    formData.append('content',content)
    formData.append('access_token',auth.getToken())
    let url = 'http://'+ENDPOINT + "?module=mail&action=saveAsDraft";
    fetch(url, {
        method: 'POST',
        body: formData,
        credentials: 'include'
    }).then(function (response) {
        return response.json()
    }).then(function (resp) {
        console.log(resp);
        if(resp.error) {
            commonErrorHandler(resp.error,fail);
        } else {
            success();
        }
    })
}
export function sendMail(to,subject,content,success,fail,attachments) {
    let formData = new FormData();
    formData.append('to',to)
    formData.append('subject',subject)
    formData.append('content',content)
    for (var i = 0; i < attachments.length; i++) {
        formData.append('attachments[]', attachments[i]);
    }
    formData.append('access_token',auth.getToken())
    var input = document.querySelector('input[type="file"]');
    if(input && input.files[0]) {
        formData.append('file', input.files[0]);
    }
    let url = 'http://'+ENDPOINT + "?module=mail&action=sendMail";
    fetch(url, {
        method: 'POST',
        body: formData,
        credentials: 'include'
    }).then(function (response) {
        return response.json()
    }).then(function (resp) {
        console.log(resp);
        if(resp.error) {
            commonErrorHandler(resp.error,fail);
        } else {
            success();
        }
    })
}
function changeMailStatus(mailId,newStatus,success) {
    let formData = new FormData();
    formData.append('mailId',mailId)
    formData.append('newStatus',newStatus)
    formData.append('access_token',auth.getToken())
    let url = 'http://'+ENDPOINT + "?module=mail&action=changeMailStatus";
    fetch(url, {
        method: 'POST',
        body: formData,
        credentials: 'include'
    }).then(function (response) {
        return response.json()
    }).then(function (resp) {
        console.log(resp);
        if(resp.error) {
            commonErrorHandler(resp.error)
        } else {
            success();
        }
    })
}

export function doLogin(user,pass,success,fail) {
    let formData = new FormData();
    formData.append('user',user)
    formData.append('pass',pass)
    formData.append('access_token',auth.getToken())
    let url = 'http://'+ENDPOINT + "?module=access&action=login";
    fetch(url, {
        method: 'POST',
        body: formData,
        credentials: 'include'
    }).then(function (response) {
        return response.json()
    }).then(function (resp) {
        console.log(resp);
        if(resp.error) {
            commonErrorHandler(resp.error,fail);
        } else {
            localStorage.setItem('token',resp.token);
            localStorage.setItem('user',user);
            success();
        }
    })

}

