import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Trainer from '../components/Trainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import TrainerCarousel from '../components/TrainerCarousel'
import { listTrainers } from '../actions/trainerActions'


function HomeScreen({ history }) {
    const dispatch = useDispatch()
    const trainerList = useSelector(state => state.trainerList)
    const { error, loading, trainers, page, pages } = trainerList

    let keyword = history.location.search

    useEffect(() => {
        dispatch(listTrainers(keyword))

    }, [dispatch, keyword])

    return (
        <div>
            {!keyword && <TrainerCarousel />}

            <h1>Latest Trainers</h1>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    :
                    <div>
                        <Row>
                            {trainers.map(trainer => (
                                <Col key={trainer._id} sm={12} md={6} lg={4} xl={3}>
                                    <Trainer trainer={trainer} />
                                </Col>
                            ))};
                        </Row>
                        <Paginate page={page} pages={pages} keyword={keyword} />
                    </div>
            }
        </div>
    )
}

export default HomeScreen
