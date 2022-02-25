import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { listTopTrainers } from '../actions/trainerActions'

function TrainerCarousel() {
    const dispatch = useDispatch()

    const trainerTopRated = useSelector(state => state.trainerTopRated)
    const { error, loading, trainers } = trainerTopRated

    useEffect(() => {
        dispatch(listTopTrainers())
    }, [dispatch])

    return (loading ? <Loader />
        : error
            ? <Message variant='danger'>{error}</Message>
            : (
                <Carousel pause='hover' className='bg-dark'>
                    {trainers.map(trainer => (
                        <Carousel.Item key={trainer._id}>
                            <Link to={`/trainer/${trainer._id}`}>
                                <Image src={trainer.image} alt={trainer.name} fluid />
                                <Carousel.Caption className='carousel.caption'>
                                    <h4>{trainer.firstName} (${trainer.lastName})</h4>
                                    <h4>{trainer.price}</h4>
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                    ))}
                </Carousel>
            )

    )
}

export default TrainerCarousel
