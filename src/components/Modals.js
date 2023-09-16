import React from 'react'
import Form from './Form'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import EditModal from './EditModal'

function Modals(props) {
  if (props.modal && !props.editModal)
    return (
      <Modal isOpen={props.modal} toggle={props.toggle}>
        <ModalHeader toggle={props.toggle}>Create Task</ModalHeader>
        <ModalBody>
          <Form saveTheTask={props.saveTask} toggle={props.toggle} />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={props.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    )
  if (props.editModal && !props.modal)
    return (
      <Modal isOpen={props.editModal} toggle={props.editToggle}>
        <ModalHeader toggle={props.editToggle}>Update Task</ModalHeader>
        <ModalBody>
          <EditModal
            index={props.index}
            editTask={props.editEvent}
            editToggle={props.editToggle}
            task={props.task}
            editModal={props.editModal}
            editEvent={props.editEvent}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={props.editToggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
}

export default Modals
