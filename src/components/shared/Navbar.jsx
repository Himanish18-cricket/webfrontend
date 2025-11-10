/* eslint-disable react/prop-types */

import styled from "styled-components";
import Logo from "../Logo";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../../context/UserContext";

const Navbar = ({ navbarRef }) => {
    const navigate = useNavigate();
    const { user, userLoading, handleFetchMe } = useUserContext();

    const handleLogout = async () => {
        try {
            await axios.post(
                "http://localhost:3000/api/v1/auth/logout",
                {},
                { withCredentials: true }
            );
            // refresh user context
            await handleFetchMe();
            navigate("/");
        } catch (error) {
            // still try to refresh local state
            await handleFetchMe();
            navigate("/");
        }
    };

    const isLoggedOut = user && user?.status === false; // UserContext sets {status:false} when not logged in

    return (
        <Wrapper ref={navbarRef}>
            <div className="container">
                <Logo />
                <div className="flex justify-end items-center">
                    <NavLink className="nav-item" to="/all-jobs">
                        Jobs
                    </NavLink>
                    <NavLink className="nav-item hidden sm:block" to="/dashboard">
                        Dashboard
                    </NavLink>

                    {/* Show Login when not authenticated; show Logout when authenticated */}
                    {userLoading ? null : isLoggedOut ? (
                        <NavLink className="nav-item" to="/login">
                            <span className="bg-[#247BF7] text-white px-6 py-2 rounded"> Login</span>
                        </NavLink>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="nav-item bg-[#247BF7] text-white px-6 py-2 rounded"
                            style={{ border: "none", cursor: "pointer" }}
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    box-shadow: 0 5px 5px var(--shadow-light);
    padding: 1rem 0;
    .container {
        width: 100%;
        max-width: 1200px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .container .nav-item {
        font-size: 16px;
        font-weight: 500;
        text-transform: capitalize;
        margin-left: 20px;
        color: var(--color-black);
    }
    .container .nav-item.active {
        color: var(--color-primary);
    }
    @media screen and (max-width: 1200px) {
        padding: 1rem 2rem;
    }
    @media screen and (max-width: 600px) {
        padding: 1.2rem 1rem;
        .container {
            display: flex;
            /* justify-content: center; */
        }
    }
`;

export default Navbar;
