import React, { useState } from "react";
import { API } from "aws-amplify";
import { useFormFields } from "../libs/hooksLib";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./NewAccount.css";

export default function NewAccount(props) {
    const [account, handleFieldChange] = useFormFields({
        accountName: "",
        accountDescription: "",
        startBalance: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    function validateForm() {
        return (
            account.accountName.length > 0 &&
            account.accountDescription.length > 0 &&
            account.startBalance.length > 0
        );
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setIsLoading(true);

        try {
            await createAccount(account);
            props.history.push("/");
        } catch (e) {
            alert(e);
            setIsLoading(false);
        }
    }

    function createAccount({ accountName, accountDescription, startBalance }) {
        return API.post("accounts", "/accounts", {
            body: {
                accountName,
                accountDescription,
                startBalance
            }
        });
    }

    return (
        <div className="NewAccount">
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="accountName">
                    <ControlLabel>Account Name</ControlLabel>
                    <FormControl
                        autoFocus
                        type='text'
                        value={account.accountName}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="accountDescription">
                    <ControlLabel>Description</ControlLabel>
                    <FormControl
                        type='text'
                        value={account.accountDescription}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="startBalance">
                    <ControlLabel>Starting Balance</ControlLabel>
                    <FormControl
                        type='number'
                        value={account.startBalance}
                        onChange={handleFieldChange}
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
                    Create
                </LoaderButton>
            </form>
        </div >
    );
}