import React from 'react';
import { Container, Button, Card } from 'react-bootstrap';

function NotFoundPage() {
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
      <Card className="text-center shadow-lg p-4" style={{ maxWidth: '500px' }}>
        <Card.Body>
          <Card.Title className="mb-4">404 - Page Not Found</Card.Title>
          <Card.Text>
            The page you're looking for does not exist. Please check the URL or return to the homepage.
          </Card.Text>
          <Button variant="primary" onClick={() => (window.location.href = '/')}>
            Go Back Home
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default NotFoundPage;
