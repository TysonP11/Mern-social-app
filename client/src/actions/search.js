import axios from 'axios'

import { SEARCH_PROFILES } from './types'

export const searchInfo = input => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }

    try {
        const res = await axios.post('/api/search', input, config)

        dispatch({
            type: SEARCH_PROFILES,
            payload: res.data
        })

    } catch (err) {
        console.log(err)
    }
}