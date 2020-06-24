import React from 'react';
import { Redirect } from "react-router-dom";

import { AuthConsumer } from "../authContext";
import Can from "../components/Can";
import Logout from "../Logout";
import Profile from "../components/Profile";
import PostList from "../components/PostList";


const DashboardPage = () => (
    <AuthConsumer>
        {({ user }) =>
            (
                <Can
                    role={user.role}
                    perform="dashboard-page:visit"
                    yes={() => (
                        <div>
                            <h1>Dashboard</h1>
                            <Logout />
                            <Profile />
                            <PostsList />
                        </div>
                    )}
                    no={() => <Redirect to="/" />}
                  />
           )}

    </AuthConsumer>

    );

export default DashboardPage;