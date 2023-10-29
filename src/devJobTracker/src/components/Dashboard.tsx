import { type SetStateAction, useEffect, useState } from "react";
import type { emailProp } from "../../../util/types.ts";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "./Table.tsx";
import Form from "react-bootstrap/Form";
import { RequestEntry } from "../../../util/types.ts";

function Dashboard({ email }: emailProp) {
  const [showInsert, setShowInsert] = useState(false);
  const [entryType, setEntryType] = useState("");
  const [company, setCompany] = useState("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  const handleCloseInsert = () => setShowInsert(false);
  const handlesetShowInsert = () => {
    setShowInsert(true);
  };

  const handleTypeChange = (value: string) => {
    // const type: string = e?.toString() as string;
    setEntryType(value);
    console.log(`Selected type: ${value}`);
  };
  const handleCompanyChange = (value: string) => setCompany(value);
  const handleDateChange = (value: string) => {
    setDate(value.toString());
    console.log(`Selected date: ${value}`);
  };
  // const handleTimeChange = (value: string) => setTime(value);

  const handleInsertEntry = async () => {
    // e.preventDefault();
    try {
      const requestBody: RequestEntry = {
        email: email,
        entryType: entryType,
        company: company,
        timestamp: new Date(date),
      };

      const response = await fetch("api/entry/insertEntry", {
        method: "POST",
        body: JSON.stringify(requestBody),
      });

      if (response.status == 200) {
        // TODO: update entrylist
      } else {
        console.error("Error inserting entry");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function getEntries() {
      try {
        const response = await fetch(`api/entry/getEntries?email=${email}`, {
          method: "GET",
        });
        // TODO, dislay entries
      }


    }
  }, [email]);

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
                  <a
                    href="#"
                    className="nav-link text-white fa-grid-2"
                    aria-current="page"
                  >
                    All
                  </a>
                </li>
                <li className="nav-item py-2 py-sm-0">
                  <a href="#" className="nav-link text-white fa-grid-2">
                    Interviews
                  </a>
                </li>
                <li className="nav-item py-2 py-sm-0">
                  <a href="#" className="nav-link text-white fa-grid-2">
                    Online Assesments
                  </a>
                </li>
                <li className="nav-item py-2 py-sm-0">
                  <a href="#" className="nav-link text-white fa-grid-2">
                    Applications
                  </a>
                </li>
                <hr></hr>
                <button
                  type="button"
                  onClick={() => handlesetShowInsert()}
                  className="accent-color text-black"
                >
                  Insert Entry
                </button>
              </ul>
            </div>
            <div className="dropdown open p-3">
              <button
                className=" profile-button btn border-none dropdown-toggle text-white"
                type="button"
                id="triggerId"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fa fa-user"></i>
                <span className="ms-2">{email}</span>
              </button>
              <div className="dropdown-menu" aria-labelledby="triggerId">
                <form action="/api/auth/signout">
                  <button className="dropdown-item">Logout</button>
                </form>
              </div>
            </div>
          </div>
          <div className="col flex-grow-1 no-overflow background-color">
            {/* put site content here */}
            <Table email={email} />
          </div>
        </div>
      </div>

      <Modal
        show={showInsert}
        onHide={handleCloseInsert}
        className="delete-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Insert Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleInsertEntry}>
            <Form.Group className="mb-3" controlId="entryType">
              <Form.Label>Type of Entry</Form.Label>
              <Form.Control
                as="select"
                value={entryType}
                onChange={(e) => handleTypeChange(e.target.value)}
              >
                <option value="Application">Application</option>
                <option value="Online Assessment">Online Assesment</option>
                <option value="Interview">Interview</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="company">
              <Form.Label>Company</Form.Label>
              <Form.Control
                placeholder="Company Name"
                onChange={(e) => setCompany(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="date">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => handleDateChange(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="time">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                onChange={(e) => setTime(e.target.value)}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="accent-color text-black"
              // onClick={handleInsertEntry}
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Dashboard;
