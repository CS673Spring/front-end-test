import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { listTrainers, deleteTrainer, createTrainer } from '../actions/trainerActions'
import { TRAINER_CREATE_RESET } from '../constants/trainerConstants'

function TrainerListScreen({ history, match }) {

    const dispatch = useDispatch()

    const trainerList = useSelector(state => state.trainerList)
    const { loading, error, trainers, pages, page } = trainerList

    const trainerDelete = useSelector(state => state.trainerDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = trainerDelete

    const trainerCreate = useSelector(state => state.trainerCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, trainer: createdTrainer } = trainerCreate


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    let keyword = history.location.search
    useEffect(() => {
        dispatch({ type: TRAINER_CREATE_RESET })

        if (!userInfo.isAdmin) {
            history.push('/login')
        }

        if (successCreate) {
            history.push(`/admin/trainer/${createdTrainer._id}/edit`)
        } else {
            dispatch(listTrainers(keyword))
        }

    }, [dispatch, history, userInfo, successDelete, successCreate, createdTrainer, keyword])


    const deleteHandler = (id) => {

        if (window.confirm('Are you sure you want to delete this trainer?')) {
            dispatch(deleteTrainer(id))
        }
    }

    const createTrainerHandler = () => {
        dispatch(createTrainer())
    }

    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Trainers</h1>
                </Col>

                <Col className='text-right'>
                    <Button className='my-3' onClick={createTrainerHandler}>
                        <i className='fas fa-plus'></i> Create Trainer
                    </Button>
                </Col>
            </Row>

            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}


            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <div>
                            <Table striped bordered hover responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>FIRST NAME</th>
                                        <th>LAST NAME</th>
                                        <th>PRICE</th>
                                        <th>CATEGORY</th>
                                        <th>TRAINING STYLE</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {trainers.map(trainer => (
                                        <tr key={trainer._id}>
                                            <td>{trainer._id}</td>
                                            <td>{trainer.first_name}</td>
                                            <td>{trainer.last_name}</td>
                                            <td>${trainer.price}</td>
                                            <td>{trainer.category}</td>
                                            <td>{trainer.training_style}</td>

                                            <td>
                                                <LinkContainer to={`/admin/trainer/${trainer._id}/edit`}>
                                                    <Button variant='light' className='btn-sm'>
                                                        <i className='fas fa-edit'></i>
                                                    </Button>
                                                </LinkContainer>

                                                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(trainer._id)}>
                                                    <i className='fas fa-trash'></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <Paginate pages={pages} page={page} isAdmin={true} />
                        </div>
                    )}
        </div>
    )
}

export default TrainerListScreen