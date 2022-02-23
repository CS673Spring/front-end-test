import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'

function Trainer({ trainer }) {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/trainer/${trainer._id}`}>
                <Card.Img src={trainer.image} />
            </Link>

            <Card.Body>
                <Link to={`/trainer/${trainer._id}`}>
                    <Card.Title as="div">
                        <strong>{trainer.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as="div">
                    <div className="my-3">
                        <Rating value={trainer.rating} text={`${trainer.numReviews} reviews`} color={'#f8e825'} />
                    </div>
                </Card.Text>


                <Card.Text as="h3">
                    ${trainer.price}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Trainer
