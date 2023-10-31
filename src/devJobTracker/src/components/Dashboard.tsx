import {
  type SetStateAction,
  useEffect,
  useState,
  type FormEvent,
} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "./Table.tsx";
import Form from "react-bootstrap/Form";
import type {
  Entry,
  RequestEntry,
  emailProp,
  EntryType,
} from "../../../util/types.ts";

function Dashboard({ email }: emailProp) {
  const [showInsert, setShowInsert] = useState(false);
  const [entryType, setEntryType] = useState<EntryType>("Application");
  const [company, setCompany] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");

  let entryToBeDeleted = null;
  const [entries, setEntries] = useState<Array<Entry>>([]);
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = (entry: Entry) => {
    entryToBeDeleted = entry;
    setShowDelete(true);
  };

  const handleCloseInsert = () => setShowInsert(false);
  const handlesetShowInsert = () => {
    setShowInsert(true);
  };

  const handleTypeChange = (value: EntryType) => {
    setEntryType(value);
    console.log(`Selected type: ${entryType}`);
  };

  const handleCompanyChange = (value: string) => {
    setCompany(value);
    console.log(`Selected company: ${company}`);
  };

  const handleDateChange = (value: string) => {
    setDate(value);
    console.log(`Selected date: ${date}`);
  };

  const handleTimeChange = (value: string) => {
    setTime(value);
    console.log(`Selected time: ${time}`);
  };

  // const handleTimeChange = (value: string) => setTime(value);
  const handleDeleteEntry = () => {};

  const toTimestampFormat = (date: string, time: string): string => {
    return date + `T` + time + `Z`;
  };

  const handleInsertEntry = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Here to avoid network refresh
    try {
      // console.log(`Date is ${date}`);
      const requestBody: RequestEntry = {
        email: email,
        entryType: entryType,
        company: company,
        timestamp: toTimestampFormat(date, time),
      };

      console.log(`RequestBody in Dashboard is ${JSON.stringify(requestBody)}`);

      const response = await fetch(`api/entry/insertEntry`, {
        method: "POST",
        body: JSON.stringify(requestBody),
      });

      if (response.status == 200) {
        // TODO: update entrylist
        const responseData = (await response.json()) as Entry[];
        console.log(`Response in Dashboard is ${JSON.stringify(responseData)}`);
        const displayData: Entry[] = responseData.flatMap((entry: Entry) => {
          return [
            {
              entryType: entry.entryType,
              company: entry.company,
              timestamp: new Date(entry.timestamp),
            },
          ];
        });

        if (responseData.length > 0) {
          setEntries(displayData);
        }
      } else {
        console.error("Error inserting entry");
      }
    } catch (error) {
      console.error(error);
    }
  }; // end of handleInsertEntry

  useEffect(() => {
    async function getEntries() {
      try {
        const response = await fetch(`api/entry/getEntries?email=${email}`, {
          method: "GET",
        });
        // TODO: get entries from GET endpoint when user signs in
        const displayData: Entry[] = await response.json();
        if (displayData.length > 0) {
          setEntries(displayData);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getEntries(); // get entries when user signs in
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
            <table className="table table-dark main-content">
              <thead>
                <tr>
                  <th scope="col">Entry Type</th>
                  <th scope="col">Company</th>
                  <th scope="col">Date</th>
                  <th scope="col">Time</th>
                  <th scope="col">Clear</th>
                </tr>
              </thead>
              <tbody>
                {entries?.map((entry: Entry, index) => {
                  return (
                    <tr key={index}>
                      {/* <th scope="row">1</th> */}
                      <td>{entry.entryType}</td>
                      <td>{entry.company}</td>
                      {/*<td>{entry.timestamp}</td>*/}
                      <td>{entry.timestamp.toLocaleDateString()}</td>
                      <td>{entry.timestamp.toLocaleTimeString()}</td>
                      <td>
                        <button
                          type="button"
                          onClick={() => handleShowDelete(entry)}
                          className="btn btn-danger btn-sm"
                          data-toggle="modal"
                          data-target="#exampleModal"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <Modal
                show={showDelete}
                onHide={handleCloseDelete}
                className="delete-modal"
              >
                <Modal.Header closeButton>
                  <Modal.Title>Delete Entry</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Are you sure you want to delete this entry?
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseDelete}>
                    Close
                  </Button>
                  <Button variant="danger" onClick={handleDeleteEntry}>
                    Delete
                  </Button>
                </Modal.Footer>
              </Modal>
            </table>
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
          <Form onSubmit={(e) => handleInsertEntry(e)}>
            <Form.Group className="mb-3" controlId="entryType">
              <Form.Label>Type of Entry</Form.Label>
              <Form.Control
                as="select"
                value={entryType}
                onChange={(e) => handleTypeChange(e.target.value as EntryType)}
              >
                <option value="Application">Application</option>
                <option value="Online Assessment">Online Assessment</option>
                <option value="Interview">Interview</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="company">
              <Form.Label>Company</Form.Label>
              <Form.Control
                placeholder="Company Name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="date">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => handleDateChange(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="time">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                value={time}
                onChange={(e) => handleTimeChange(e.target.value)}
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
