import React, { useState } from "react";
import "./Users.css";

function Users(props) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true); // Set loading to true before calling the API

            // Simulate loading time for 4 seconds
            setTimeout(async () => {
                const response = await fetch("https://reqres.in/api/users?page=1");
                const data = await response.json();
                setUsers(data.data);
                setLoading(false); // Set loading to false after response is received
            }, 2000);
        } catch (error) {
            console.log("Error fetching data:", error);
        }
    };

    return (
        <>
            {loading && <div className="lds-circle"><div></div></div>} {/* Show the loader if loading is true */}

            <div className="text-center display-1 fw-semibold mt-5 text-white">
                {props.title}
            </div>

            <button
                className="btn btn-outline-dark d-flex mx-auto mt-4"
                onClick={fetchData}
            >
                Get Users
            </button>

            <div className="container">
                <div className="text-center fs-6 fw-medium mt-4">
                    <div className="text-white display-4 use">Data Of Users:</div>
                    <div className="card-container p-5">
                        {users.length > 0 ? (
                            users.map(({ id, email, first_name, last_name, avatar }) => (
                                <div className="card gap-2" key={id}>
                                    <img
                                        src={avatar}
                                        className="avatar-image card-img-top"
                                        alt="avatar"
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            {first_name} {last_name}
                                        </h5>
                                        <p className="card-text">{email}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No users found</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Users;
