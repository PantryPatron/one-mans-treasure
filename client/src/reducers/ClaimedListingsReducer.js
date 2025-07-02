import { FETCH_CLAIMED_LISTINGS } from "../actions/ListingActions";

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_CLAIMED_LISTINGS:
            return action.payload.data || state || null;
    }
    return state;
};
