import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { listTrainerDetails, updateTrainer } from '../actions/trainerActions'
import { TRAINER_UPDATE_RESET } from '../constants/trainerConstants'


function TrainerEditScreen({ match, history }) {

    const trainerId = match.params.id

    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [training, setTraining] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const trainerDetails = useSelector(state => state.trainerDetails)
    const { error, loading, trainer } = trainerDetails

    const trainerUpdate = useSelector(state => state.trainerUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = trainerUpdate


    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: TRAINER_UPDATE_RESET })
            history.push('/admin/trainerlist')
        } else {
            if (!trainer.first_name || !trainer.last_name || trainer._id !== Number(trainerId)) {
                dispatch(listTrainerDetails(trainerId))
            } else {
                setFirstName(trainer.first_name)
                setLastName(trainer.last_name)
                setPrice(trainer.price)
                setImage(trainer.image)
                setTraining(trainer.training)
                setCategory(trainer.category)
                setCountInStock(trainer.countInStock)
                setDescription(trainer.description)

            }
        }



    }, [dispatch, trainer, trainerId, history, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateTrainer({
            _id: trainerId,
            first_name,
            last_name,
            price,
            image,
            training,
            category,
            countInStock,
            description
        }))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('trainer_id', trainerId)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/trainers/upload/', formData, config)


            setImage(data)
            setUploading(false)

        } catch (error) {
            setUploading(false)
        }
    }

    return (
        <div>
            <Link to='/admin/trainerlist'>
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit Trainer</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <Form onSubmit={submitHandler}>

                            <Form.Group controlId='first_name'>
                                <Form.Label>FIRST NAME</Form.Label>
                                <Form.Control

                                    type='name'
                                    placeholder='Enter first name'
                                    value={first_name}
                                    onChange={(e) => setFirstName(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='first_name'>
                                <Form.Label>LAST NAME</Form.Label>
                                <Form.Control

                                    type='name'
                                    placeholder='Enter last name'
                                    value={last_name}
                                    onChange={(e) => setLastName(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='price'>
                                <Form.Label>Price</Form.Label>
                                <Form.Control

                                    type='number'
                                    placeholder='Enter price'
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>


                            <Form.Group controlId='image'>
                                <Form.Label>Image</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Enter image'
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                >
                                </Form.Control>

                                <Form.File
                                    id='image-file'
                                    label='Choose File'
                                    custom
                                    onChange={uploadFileHandler}
                                >

                                </Form.File>
                                {uploading && <Loader />}

                            </Form.Group>


                            <Form.Group controlId='training'>
                                <Form.Label>Training</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Enter training'
                                    value={training}
                                    onChange={(e) => setTraining(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='countinstock'>
                                <Form.Label>Stock</Form.Label>
                                <Form.Control

                                    type='number'
                                    placeholder='Enter stock'
                                    value={countInStock}
                                    onChange={(e) => setCountInStock(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='category'>
                                <Form.Label>Category</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Enter category'
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='description'>
                                <Form.Label>Description</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Enter description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>


                            <Button type='submit' variant='primary'>
                                Update
                        </Button>

                        </Form>
                    )}

            </FormContainer >
        </div>

    )
}

export default TrainerEditScreen