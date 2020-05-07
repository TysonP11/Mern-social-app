import React, { useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { addPost } from "../../actions/post"

import FileUpload from "../../util/FileUpload"

// const PostForm = ({ addPost })

function PostForm(props) {
    // const [formData, setFormData] = useState({
    //     text: "",
    //     address: "",
    //     lat: 10,
    //     lng: 10,
    // })

    // const { text, address } = formData

    const [text, setText] = useState('')
    const [address, setAddress] = useState('')
    const [Images, setImages] = useState([])

    const uploadImages = (newImages) => {
        setImages(newImages)
    }

    const onSubmit = (event) => {
        event.preventDefault()

        props.addPost({ text: text, address: address, photo: Images })
        props.history.push("/posts")
    }

    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Write a Review</h3>
            </div>
            <form className="form my-1" onSubmit={onSubmit}>
                <FileUpload refreshFunction={uploadImages} />

                <textarea
                    name="text"
                    cols="30"
                    rows="5"
                    placeholder="Say something"
                    value={text}
                    onChange={(e) =>
                        setText(e.target.value)
                    }
                    required
                ></textarea>

                <input
                    type="text"
                    name="address"
                    value={address}
                    placeholder="Address"
                    onChange={(e) =>
                        setAddress(e.target.value)
                    }
                ></input>

                <input
                    type="submit"
                    className="btn btn-dark my-1"
                    value="Submit"
                />
            </form>
        </div>
    )
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
}

export default connect(null, { addPost })(PostForm)
