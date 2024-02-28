// ContractModal.js
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

function ContractModal(props) {
  return (
    <Modal show={props.show} onHide={props.handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Contract</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>hello!</div>
      </Modal.Body>
    </Modal>
  );
}

export default ContractModal;
