// import { useEffect, useState } from "react";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import type { emailProp, Entry, RequestEntry } from "../../../util/types.ts";
//
// function Table({ email }: emailProp, { type, company, timestamp }: Entry) {
//   let entryToBeDeleted = null;
//   const [entries, setEntries] = useState<Array<Entry>>([]);
//   const [showDelete, setShowDelete] = useState(false);
//   const handleCloseDelete = () => setShowDelete(false);
//   const handleShowDelete = (entry: Entry) => {
//     entryToBeDeleted = entry;
//     setShowDelete(true);
//   };
//   const handleDeleteEntry = () => {};
//
//   const handleInsertEntry = async () => {
//     // e.preventDefault();
//     try {
//       const requestBody: RequestEntry = {
//         email: email,
//         entryType: type,
//         company: company,
//         timestamp: timestamp,
//       };
//
//       console.log(`RequestBody is ${requestBody}`);
//
//       const response = await fetch("api/entry/insertEntry", {
//         method: "POST",
//         body: JSON.stringify(requestBody),
//       });
//
//       if (response.status == 200) {
//         // TODO: update entrylist
//         const reponseData: Entry[] = await response.json();
//         setEntries(reponseData);
//       } else {
//         console.error("Error inserting entry");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };
//
//   useEffect(() => {
//     async function getEntries() {
//       try {
//         const response = await fetch(`api/entry/getEntries?email=${email}`, {
//           method: "GET",
//         });
//         // TODO: get entries from GET endpoint when user signs in
//         const displayData: Entry[] = await response.json();
//         setEntries(displayData);
//       } catch (error) {
//         console.error(error);
//       }
//       getEntries(); // get entries when user signs in
//     }
//   }, [email]);
//
//   // useEffect(() => {
//   //   // initial call to get endpoint
//   //   // get list of entries for current user
//   //   // update entries state
//   //   const x: DisplayEntry = {
//   //     company: "Amazon",
//   //     timestamp: new Date("2023-10-28T14:30"),
//   //     type: "OA",
//   //   };
//   //   setEntries(entries.concat(x));
//   // }, [email]);
//
//   return (
//     <table className="table table-dark main-content">
//       <thead>
//         <tr>
//           <th scope="col">Type</th>
//           <th scope="col">Company</th>
//           <th scope="col">Date</th>
//           <th scope="col">Time</th>
//           <th scope="col">Clear</th>
//         </tr>
//       </thead>
//       <tbody>
//         {entries?.map((entry: Entry, index) => {
//           return (
//             <tr key={index}>
//               {/* <th scope="row">1</th> */}
//               <td>{entry.type}</td>
//               <td>{entry.company}</td>
//               <td>{entry.timestamp.toLocaleDateString()}</td>
//               <td>{entry.timestamp.toLocaleTimeString()}</td>
//               <td>
//                 <button
//                   type="button"
//                   onClick={() => handleShowDelete(entry)}
//                   className="btn btn-danger btn-sm"
//                   data-toggle="modal"
//                   data-target="#exampleModal"
//                 >
//                   <i className="fa-solid fa-trash"></i>
//                 </button>
//               </td>
//             </tr>
//           );
//         })}
//       </tbody>
//       <Modal
//         show={showDelete}
//         onHide={handleCloseDelete}
//         className="delete-modal"
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Delete Entry</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>Are you sure you want to delete this entry?</Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseDelete}>
//             Close
//           </Button>
//           <Button variant="danger" onClick={handleDeleteEntry}>
//             Delete
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </table>
//   );
// }
//
// export default Table;
