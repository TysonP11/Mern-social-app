import React, { useState, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { searchInfo } from '../../actions/search'
import SearchSpinner from './SearchSpinner'
import ProfileItem from '../profiles/ProfileItem'
import Spinner from './Spinner'

const Search = ({ search, searchInfo }) => {
    const [input, setInput] = useState('')

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        searchInfo({
            input: input,
        })
        // eslint-disable-next-line
    }, [input])

    const onChange = (event) => {
        const value = event.target.value
        setInput(value)
        setLoading(true)

        setTimeout(() => {
            setLoading(false)
        }, 20000)
    }

    const clearInput = () => {
        setInput('')
    }

    const searchResult = document.getElementById('search-result')

    if (input.length > 0) {
        window.addEventListener('click', (event) => {
            if (
                event.target !== searchResult &&
                event.target.parentNode !== searchResult &&
                event.target.name !== 'input'
            ) {
                searchResult.style.visibility = 'hidden'
                clearInput()
            }
            if (event.target.name === 'input') {
                searchResult.style.visibility = 'visible'
            }
        })
    }

    return search.loading && input.length > 0 ? (
        <Spinner />
    ) : (
        <div className='searching'>
            <input
                name='input'
                onChange={onChange}
                className='form-input fa-placeholder'
                value={input}
                placeholder='&#xF002; Search'
            />
            <div id='search-result'>
                {input.length === 0 ? null : (
                    <Fragment>
                        <div className='search-loading'>
                            <label onClick={clearInput}>
                                <i className='fas fa-times' />
                            </label>
                        </div>

                        <div className='profiles'>
                            {search.profiles.length > 0 ? (
                                search.profiles.map((profile) => (
                                    <ProfileItem
                                        key={profile._id}
                                        profile={profile}
                                        showPosts={false}
                                        showActions={false}
                                    />
                                ))
                            ) : loading ? (
                                <SearchSpinner />
                            ) : (
                                <h4>Not Found</h4>
                            )}
                        </div>
                    </Fragment>
                )}
            </div>
        </div>
    )
}

Search.propTypes = {
    searchInfo: PropTypes.func.isRequired,
    search: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    search: state.search,
})

export default connect(mapStateToProps, { searchInfo })(Search)
