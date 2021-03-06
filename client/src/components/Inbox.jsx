import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";

import Dragonite from "../components/Dragonite";
// import DeleteButton from "./DeleteButton";

// BASICALLY COPIED OVER FROM TEAM MANAGER AND FIXING VARIABLES.
// HAHAHAHAHAHAHAHA
// user is in props. can use props.user.username or ._id
export default (props) => {
  const [requests, setRequests] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:9001/api/requests")
      .then((res) => {
        // console.log(res.data);
        setRequests(res.data.requests);
        setLoaded(true);
      })
      .catch((err) => console.log("Error: ", err));
    //
    // fetch();
  }, []);

  const filterRequestByUser = () => {
    return requests.filter(
      (request) => request.requestBy === props.user.username
    );
  };

  return (
    <div className="h-100">
      <div className="container">
        <Dragonite />
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">INBOX</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {loaded ? (
              <div>
                <h5>
                  Hey, {props.user.username}! Here are some Responses others
                  have written for your Requests!
                </h5>

                <div className="container">
                  {/* <ul className="pagination"> */}
                  {console.log(filterRequestByUser(requests))}
                  <ul>
                    {/* Your previous Requests... */}
                    {filterRequestByUser(requests).map((request, idx) => {
                      return (
                        <div key={idx}>
                          <li className="page-item">
                            For: {request.request} -They wrote:{" "}
                            {request.response.body}
                          </li>
                        </div>
                      );
                    })}
                  </ul>
                  {/* </ul> */}
                </div>
                {/* <div style={{ textAlign: "center" }}>
                  <Button variant="outline-dark">Previous</Button>
                  {"   "}
                  <Button variant="outline-dark">Next</Button>
                </div> */}
              </div>
            ) : (
              <p>
                Sorry {props.user.username}, Looks like there are no replies at
                the moment.. Check back again later!
              </p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="info" onClick={props.onHide}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};
