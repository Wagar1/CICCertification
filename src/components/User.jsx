import { useRef } from "react";
import { Col, Form, Button } from "react-bootstrap";

const userSelect = (formName, fieldPrefix) => {
    let url =
        window.baseUrl +
        '?func=user.SelectUserDlg&formname=' +
        formName +
        '&fieldprefix=' +
        fieldPrefix +
        '&title=Select%20User&DisplayUserName&NoGroups=FALSE';
    let w;
    url = url + '&NoGroupsSelectable=TRUE';
    w = window.open(
        url,
        '',
        'height=340,width=800,scrollbars=yes,resizable=yes,menubar=no,toolbar=yes,status=yes'
    );

    if (w.focus) {
        w.focus();
    }
    
    return w;
};

const User = props => {
    const inputRefId = useRef();
    const inputRefName = useRef();
    const handleUserInput = e => {
        e.preventDefault();
        window.portal = userSelect('users', props.fieldPrefix);
        var timer = setInterval(function () {
            if (window.portal.closed) {
                clearInterval(timer);
                props.onUserSelected({
                    id: props.id,
                    userId: inputRefId.current.value,
                    userName: inputRefName.current.value,
                });
            }
        }, 1000);
    };
    return <Col sm={8} style={{display: "flex"}}>
        <Form.Control 
            type="text"
            readOnly
            size="sm"
            name = {
                props.fieldPrefix + '_Name'
            }
            value={props.userName}
        />
        <input
            ref={
                inputRefId
            }
            id={
                props.fieldPrefix +
                '_ID'
            }
            value={props.userId}
            hidden
        />
        <input
            ref={
                inputRefName
            }
            name={
                props.fieldPrefix +
                '_SavedName'
            }
            value={props.userName}
            hidden
        />
        <Button
            variant="secondary"
            size="sm"
            onClick={
                handleUserInput
            }
        >
            <img src={window.userLogo} alt="user" />
        </Button>
    </Col>
}

export default User;
