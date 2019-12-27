import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
//import { useFormFields } from "../libs/hooksLib";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";

export default function Accounts(props) {
    const [account, setAccount] = useState(null);
    const [content, setContent] = useState({
        accountName: "",
        accountDescription: "",
        accountBalance: ""
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        function loadAccount() {
            return API.get("accounts", `/accounts/${props.match.params.id}`);
        }

        async function onLoad() {
            try {
                const account = await loadAccount();
                setAccount(account)

                setContent({
                    ...content,
                    accountName: account.accountName,
                    accountDescription: account.accountDescription,
                    accountBalance: account.accountBalance
                })

            } catch (e) {
                alert('Called Here ' + e);
            }
        }

        onLoad();
    }, [props.match.params.id]);

    function validateForm() {
        return (
            content.accountName.length > 0 &&
            content.accountDescription.length > 0
        );
    }

    function saveAccount({ accountName, accountDescription }) {
        return API.put("accounts", `/accounts/${props.match.params.id}`, {
            body: { accountName, accountDescription }
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setIsLoading(true);

        try {
            await saveAccount(content)
            props.history.push("/");
        } catch (e) {
            alert(e);
            setIsLoading(false);
        }
    }

    function deleteAccount() {
        return API.del("accounts", `/accounts/${props.match.params.id}`);
    }

    async function handleDelete(event) {
        event.preventDefault();

        const confirmed = window.confirm(
            "Are you sure you want to delete this account?"
        );

        if (!confirmed) {
            return;
        }

        setIsDeleting(true);

        try {
            await deleteAccount();
            props.history.push("/");
        } catch (e) {
            alert(e);
            setIsDeleting(false);
        }
    }

    return (
        <div className="Accounts">
            {account && (
                <form onSubmit={handleSubmit}>
                    <FormGroup controlId="accountName">
                        <ControlLabel>Account Name</ControlLabel>
                        <FormControl
                            autoFocus
                            type='text'
                            name='accountName'
                            value={content.accountName}
                            onChange={(e) => setContent({ ...content, [e.target.name]: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup controlId="accountDescription">
                        <ControlLabel>Description</ControlLabel>
                        <FormControl
                            type='text'
                            name='accountDescription'
                            value={content.accountDescription}
                            onChange={(e) => setContent({ ...content, [e.target.name]: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup controlId="accountBalance">
                        <ControlLabel>Balance</ControlLabel>
                        <FormControl
                            type='text'
                            name='accountBalance'
                            readOnly={true}
                            value={content.accountBalance}
                        />
                    </FormGroup>
                    <LoaderButton
                        block
                        type="submit"
                        bsSize="large"
                        bsStyle="primary"
                        isLoading={isLoading}
                        disabled={!validateForm()}
                    >
                        Save
                    </LoaderButton>
                    <LoaderButton
                        block
                        bsSize="large"
                        bsStyle="danger"
                        onClick={handleDelete}
                        isLoading={isDeleting}
                    >
                        Delete
                    </LoaderButton>
                </form>
            )}
        </div>
    );
}