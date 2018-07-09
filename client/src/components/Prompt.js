import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default ({ title, confirmText, confirmButtonText, handleConfirmation, show, toggle }) => 
       <div>
        <Modal isOpen={show} toggle={toggle}>
          <ModalHeader toggle={toggle}>{title}</ModalHeader>
          <ModalBody>
            <p>{confirmText}</p>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleConfirmation}>{confirmButtonText}</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
