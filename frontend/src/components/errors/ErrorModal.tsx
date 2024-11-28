import React from 'react';
import { Modal, Button } from 'react-bootstrap';

type ErrorModalProps = {
  show: boolean;
  errorTitle: string;
  errorMessage: string;
  onClose: () => void;
};

function ErrorModal({ show, errorTitle, errorMessage, onClose }: ErrorModalProps) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{errorTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{errorMessage}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => (window.location.href = '/')}>
          Go Back Home
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ErrorModal;
