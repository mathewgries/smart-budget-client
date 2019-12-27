import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";

export default function Home(props) {
    const [accounts, setAccounts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function onLoad() {
            if (!props.isAuthenticated) {
                return;
            }

            try {
                const accounts = await loadAccounts();
                setAccounts(accounts);
            } catch (e) {
                alert(e);
            }

            setIsLoading(false);
        }

        onLoad();
    }, [props.isAuthenticated]);

    function loadAccounts() {
        return API.get("accounts", "/accounts");
      }

    function renderAccountsList(accounts) {
        return [{}].concat(accounts).map((account, i) =>
            i !== 0 ? (
                <LinkContainer key={account.accountId} to={`/accounts/${account.accountId}`}>
                    <ListGroupItem header={account.accountName.trim().split("\n")[0]}>
                        {"Created: " + new Date(account.createdAt).toLocaleString()}
                    </ListGroupItem>
                </LinkContainer>
            ) : (
                    <LinkContainer key="new" to="/accounts/new">
                        <ListGroupItem>
                            <h4>
                                <b>{"\uFF0B"}</b> Create a new account
                            </h4>
                        </ListGroupItem>
                    </LinkContainer>
                )
        );
    }

    function renderLander() {
        return (
            <div className="lander">
                <h1>Smart Budget</h1>
                <p>A simple budget app</p>
            </div>
        );
    }

    function renderAccounts() {
        return (
            <div className="accounts">
                <PageHeader>Your Accounts</PageHeader>
                <ListGroup>
                    {!isLoading && renderAccountsList(accounts)}
                </ListGroup>
            </div>
        );
    }

    return (
        <div className="Home">
            {props.isAuthenticated ? renderAccounts() : renderLander()}
        </div>
    );
}