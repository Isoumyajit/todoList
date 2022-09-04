import React from "react";
import Form from "./Form";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function Modals(props) {
  return (
    <div>
      <Modal isOpen={props.modal} toggle={props.toggle}>
        <ModalHeader toggle={props.toggle}>Modal title</ModalHeader>
        <ModalBody>
          <Form saveTheTask={props.saveTask} toggle={props.toggle} />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={props.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Modals;
