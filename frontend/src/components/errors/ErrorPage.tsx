import React from 'react';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { Alert, Button, Container } from 'react-bootstrap';

function ErrorPage() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
        <Alert variant="danger" className="text-center">
          <h1>Error {error.status}</h1>
          <p>{error.statusText || "Something went wrong!"}</p>
          {error.data?.message && <p className="fw-light">{error.data.message}</p>}
        </Alert>
        <Button variant="primary" onClick={() => (window.location.href = '/')}>
          Go Back Home
        </Button>
      </Container>
    );
  }

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
      <Alert variant="warning" className="text-center">
        <h1>Unexpected Error</h1>
        <p>Something went wrong. Please try again later.</p>
      </Alert>
      <Button variant="primary" onClick={() => (window.location.href = '/')}>
        Go Back Home
      </Button>
    </Container>
  );
}

export default ErrorPage;
