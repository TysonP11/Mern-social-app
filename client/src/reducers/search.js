import {
    SEARCH_PROFILES
} from '../actions/types'

const initialState = {
    profiles: [],
    loading: true
}

export default function(state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case SEARCH_PROFILES:
            return {
                ...state,
                profiles: payload,
                loading: false
            }
    
        default:
            return state
    }
}

