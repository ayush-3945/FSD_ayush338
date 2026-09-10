import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";

const ChildComponent = ({ user }) => {
    console.log(user);

    return (
        <div>
            <h1>Hello {user.name}</h1>
            <h1>{user.email}</h1>
            <h1>{user.section}</h1>
        </div>
    );
};

const ParentComponent = () => {

    let user = {
        name: "Ayush kumar Pandey",
        email: "ayushpandey781808@gmail.com",
        section: "CSE-16"
    };

    let newUser = {
        ...user,
        section: "CSE-17"
    };

    return (
        <div>
            <ChildComponent user={newUser} />
        </div>
    );
};

const root = ReactDOM.createRoot(
    document.getElementById("root")
);

root.render(
    <ParentComponent />
);