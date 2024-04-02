import React, { useState } from 'react';
import developers from './developers';
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';

    const CardsContainer = () => {
    const [editModel, setEditModel] = useState(false);
    const [deleteModel, setDeleteModel] = useState(false);

    const toggleEdit = () => setEditModel(!editModel);
    const toggleDelete = () => setDeleteModel(!deleteModel);

    return (
        <Container>
        <h1>Profiles</h1>
        <Row className='d-flex justify-content-center'>
            {/* Iterate through the cards */}
            {developers.map(profile => (
            <Col key={profile.id} xs={12} sm={6} md={4} lg={3} className='mb-3'>
                <Card className='shadow p-2 border rounded'>
                <img
                    alt='Sample'
                    src={profile.img}
                    className='rounded-top img-fluid'
                />
                {/* Include model for edit & delete icons */}
                <Container className='my-2 text-end'>
                    <Button onClick={toggleEdit} size='sm' color='primary' className='mx-1'>Edit</Button>
                    <Button onClick={toggleDelete} size='sm' color='danger'>Delete</Button>
                </Container>
                <CardBody className='text-start'>
                    <CardTitle tag='h2' className='fw-bolder'>{profile.name}</CardTitle>
                    <CardSubtitle tag='h6' className='mb-3'>{profile.role}</CardSubtitle>
                    <CardText className='lead fst-italic'>{profile.about}</CardText>
                    <CardText><small className="text-muted">Last updated 3 mins ago</small></CardText>
                </CardBody>
                </Card>
            </Col>
            ))}
        </Row>

        {/* Edit Model */}
        <Modal isOpen={editModel} toggle={toggleEdit}>
            <ModalHeader>Edit your preferences</ModalHeader>
            <ModalBody>Edit fields here....</ModalBody>
            <ModalFooter>
            <Button color='primary' onClick={toggleEdit}>Cancel</Button>
            <Button color='success' onClick={toggleEdit}>Ok</Button>
            </ModalFooter>
        </Modal>

        {/* Delete Model */}
        <Modal isOpen={deleteModel} toggle={toggleDelete}>
            <ModalBody>Are you sure you want to delete your profile?</ModalBody>
            <ModalFooter>
            <Button color='primary' onClick={toggleDelete}>Cancel</Button>
            <Button color='danger' onClick={toggleDelete}>Delete</Button>
            </ModalFooter>
        </Modal>
        </Container>
    );
    };

export default CardsContainer;
