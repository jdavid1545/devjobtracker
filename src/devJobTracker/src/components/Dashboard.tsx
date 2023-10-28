import { type SetStateAction, useEffect, useState } from "react";
import type { DashboardProps } from "../../../util/types.ts";
import Table from './Table.tsx'
function Dashboard({email}: DashboardProps) {
    return (
        <div className="app">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4 col-lg-2 min-vh-100 sidepanel d-flex flex-column justify-content-between">
                        <div className="foreground-color p-2">
                            <a className="d-flex text-decoration-none mt-1 align-items-center text-white">
                                <span className="fs-4 d-none d-sm-inline">DevJobTracker</span>
                            </a>
                            <ul className="nav nav-pills flex-column mt-4">
                                <li className="nav-item py-2 py-sm-0">
                                    <a href="#" className="nav-link text-white fa-grid-2" aria-current="page">All</a>
                                </li>
                                <li className="nav-item py-2 py-sm-0">
                                    <a href="#" className="nav-link text-white fa-grid-2">Interviews</a>
                                </li>
                                <li className="nav-item py-2 py-sm-0">
                                    <a href="#" className="nav-link text-white fa-grid-2">Online Assesments</a>
                                </li>
                                <li className="nav-item py-2 py-sm-0">
                                    <a href="#" className="nav-link text-white fa-grid-2">Applications</a>
                                </li>
                            </ul>
                        </div>
                        <div className="dropdown open p-3">
                            <button className=" profile-button btn border-none dropdown-toggle text-white" type="button" id="triggerId" data-bs-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                        <i className="fa fa-user" ></i><span className="ms-2">{email}</span>
                                    </button>
                            <div className="dropdown-menu" aria-labelledby="triggerId">
                            <form action="/api/auth/signout"><button className="dropdown-item">Logout</button></form>
                            </div>
                        </div>
                    </div>
                    <div className="col flex-grow-1 no-overflow background-color">
                        {/* put site content here */}
                        <Table email = {email}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;