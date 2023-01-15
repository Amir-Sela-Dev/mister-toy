import React from 'react';

import { toyService } from "../services/toy.service.local.js"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { loadToy } from "../store/toy.action.js"
import { useDispatch, useSelector } from 'react-redux'
import { loadReviews, addReview, removeReview } from '../store/review.actions.js'
import { reviewService } from '../services/review.service.js';

export function ToyDetails() {
    // const [toy, setToy] = useState(null)
    let { toy } = useSelector((storeState) => storeState.toyModule)
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const reviews = useSelector(storeState => storeState.reviewModule.reviews)
    const [reviewToEdit, setReviewToEdit] = useState({ txt: '', aboutToyId: '' })

    console.log(reviewToEdit);
    const { toyId } = useParams()
    const navigate = useNavigate()

    let imgUrl = `${toy.imgName}.png`
    if (!toy.imgName) imgUrl = 'toy.jpg'


    useEffect(() => {
        loadToy(toyId)
        onLoadReviews()
    }, [])

    function onLoadReviews() {
        let filterBy = reviewService.getDefultReviewFilter()
        filterBy.aboutToyId = toyId
        loadReviews(filterBy)
    }


    const handleChange = ev => {
        const { name, value } = ev.target
        setReviewToEdit({ ...reviewToEdit, [name]: value })
    }

    const onAddReview = async ev => {
        ev.preventDefault()
        reviewToEdit.aboutToyId = toyId
        if (!reviewToEdit.txt || !reviewToEdit.aboutToyId) return alert('All fields are required')
        try {
            await addReview(reviewToEdit)
            showSuccessMsg('Review added')
            setReviewToEdit({ txt: '', aboutToyId: '' })
        } catch (err) {
            showErrorMsg('Cannot add review')
        }
    }
    const onRemove = async reviewId => {
        try {
            await removeReview(reviewId)
            showSuccessMsg('Review removed')
        } catch (err) {
            showErrorMsg('Cannot remove')
        }
    }

    function canRemove(review) {
        return review.byUser._id === loggedInUser?._id || loggedInUser?.isAdmin
    }







    if (!toy) return <div>Loading...</div>

    const { name, price, _id } = toy

    return <section className="toy-details">
        <h1>Toy vendor : {name}</h1>
        <h3>Price: ${price}</h3>
        <img src={require(`../assets/img/${imgUrl}`)} />
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat perferendis tempora aspernatur sit, explicabo veritatis corrupti perspiciatis repellat, enim quibusdam!</p>
        <Link to={`/toy/edit/${_id}`}>Edit</Link>

        {(reviews.length > 0) && <div className="review-container">
            <h1>Reviews</h1>
            <ul className="review-list">
                {reviews.map(review => (
                    <li key={review._id}>
                        {canRemove(review) &&
                            <button onClick={() => onRemove(review._id)}>X</button>}
                        <p>
                            About:
                            <Link to={`/toy/${review.aboutToy._id}`}>
                                {review.aboutToy.fullname}
                            </Link>
                        </p>
                        <h3>{review.txt}</h3>
                        <p>
                            By:
                            <Link to={`/user/${review.byUser._id}`}>
                                {review.byUser.fullname}
                            </Link>
                        </p>
                    </li>
                ))}
            </ul>
        </div>}
        <h1>Add review</h1>

        {(loggedInUser) &&
            <form onSubmit={onAddReview}>
                <textarea
                    name="txt"
                    onChange={handleChange}
                    value={reviewToEdit.txt}
                ></textarea>
                <button>Add</button>
            </form>}



    </section>
}