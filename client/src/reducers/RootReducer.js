import { combineReducers } from "redux";
import ClaimedListings from "./ClaimedListingsReducer";
import ListingsReducer from "./ListingsReducer";
import UsersReducer from "./UsersReducer";

const rootReducer = combineReducers({
    listings: ListingsReducer,
    interestedUsers: UsersReducer,
    claimedListings: ClaimedListings,
});

export default rootReducer;
