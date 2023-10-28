import { type SetStateAction, useEffect, useState } from "react";
import type { emailProp, DisplayEntry } from "../../../util/types.ts";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
function Table({email}: emailProp) {
  let entryToBeDeleted = null
    const [entries, setEntries] = useState<Array<DisplayEntry>>([]);
    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = (entry: DisplayEntry) => {
      entryToBeDeleted = entry
      setShowDelete(true);
    }
    const handleDeleteEntry = () => {
      
    }

    useEffect(() => {
        // initial call to get endpoint
        // get list of entries for current user
        // update entries state
        const x: DisplayEntry = {
            company: "Amazon",
            timestamp: new Date('2023-10-28T14:30'),
            type:"OA"
        }
        setEntries(entries.concat(x))
    }, [email]);

    return (
        <table className="table table-dark main-content" >
  <thead>
    <tr>
      <th scope="col">Type</th>
      <th scope="col">Company</th>
      <th scope="col">Date</th>
      <th scope="col">Time</th>
      <th scope="col">Clear</th>      
    </tr>
  </thead>
  <tbody>
    {entries?.map((entry: DisplayEntry, index) => {
        return (
        <tr key = {index}>
        {/* <th scope="row">1</th> */}
        <td>{entry.type}</td>
        <td>{entry.company}</td>
        <td>{entry.timestamp.toLocaleDateString()}</td>
        <td>{entry.timestamp.toLocaleTimeString()}</td>
        <td><button type="button" onClick={() => handleShowDelete(entry)} className="btn btn-danger btn-sm" data-toggle="modal" data-target="#exampleModal"><i className="fa-solid fa-trash"></i></button></td>
      </tr>
        )
    })}
  </tbody>
  <Modal show={showDelete} onHide={handleCloseDelete} className="delete-modal">
        <Modal.Header closeButton>
          <Modal.Title>Delete Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this entry?</Modal.Body>
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
    )
}

export default Table;