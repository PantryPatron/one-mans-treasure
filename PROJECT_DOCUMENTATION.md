# One Man's Treasure - Project Documentation

**Author:** Erwin

-   [One Man's Treasure - Project Documentation](#one-mans-treasure---project-documentation)
    -   [Overview](#overview)
    -   [Tech Stack](#tech-stack)
        -   [Backend](#backend)
        -   [Frontend](#frontend)
        -   [Build Tools \& Development](#build-tools--development)
        -   [External APIs](#external-apis)
    -   [Project Structure](#project-structure)
    -   [API Endpoints](#api-endpoints)
        -   [User Management](#user-management)
            -   [`POST /signup`](#post-signup)
            -   [`POST /login`](#post-login)
            -   [`PUT /account/:userId`](#put-accountuserid)
            -   [`PUT /interestedUsers`](#put-interestedusers)
            -   [`POST /user`](#post-user)
        -   [Listings Management](#listings-management)
            -   [`GET /listing`](#get-listing)
            -   [`POST /listing`](#post-listing)
            -   [`PUT /listing/:listingId`](#put-listinglistingid)
            -   [`DELETE /listing/:listingId`](#delete-listinglistingid)
            -   [`GET /fetch/:listingId`](#get-fetchlistingid)
            -   [`POST /listing/claimed`](#post-listingclaimed)
            -   [`POST /listing/give`](#post-listinggive)
            -   [`PUT /interest`](#put-interest)
        -   [Comments](#comments)
            -   [`POST /api/comments`](#post-apicomments)
    -   [Database Schema](#database-schema)
        -   [Users Collection](#users-collection)
        -   [Listings Collection](#listings-collection)
        -   [Comments Collection](#comments-collection)
    -   [Key Features](#key-features)
        -   [Karma System](#karma-system)
        -   [Image Handling](#image-handling)
        -   [Search Functionality](#search-functionality)
        -   [Session Management](#session-management)
    -   [Heroku Deployment Setup](#heroku-deployment-setup)
        -   [Prerequisites](#prerequisites)
        -   [Environment Variables Required](#environment-variables-required)
        -   [Deployment Steps](#deployment-steps)
        -   [Important Notes for Deployment](#important-notes-for-deployment)
    -   [Required Versions](#required-versions)
        -   [Node.js and npm Requirements](#nodejs-and-npm-requirements)
    -   [Environment Variables](#environment-variables)
    -   [Getting Started (Development)](#getting-started-development)
        -   [Prerequisites](#prerequisites-1)
        -   [Installation](#installation)
    -   [Notable Implementation Details](#notable-implementation-details)
        -   [Redux Architecture](#redux-architecture)
        -   [Security Considerations](#security-considerations)
        -   [Performance Optimizations](#performance-optimizations)
        -   [Known Issues \& Bugs](#known-issues--bugs)
        -   [Development Workflow](#development-workflow)
    -   [Recommended Improvements](#recommended-improvements)
    -   [Testing](#testing)
    -   [Redux Store Architecture](#redux-store-architecture)
        -   [Store Configuration](#store-configuration)
        -   [Complete Store Structure Map](#complete-store-structure-map)
        -   [Detailed Store Breakdown](#detailed-store-breakdown)
            -   [1. Listings Reducer (`ListingsReducer.js`)](#1-listings-reducer-listingsreducerjs)
            -   [2. Users Reducer (`UsersReducer.js`)](#2-users-reducer-usersreducerjs)
            -   [3. Claimed Listings Reducer (`ClaimedListingsReducer.js`)](#3-claimed-listings-reducer-claimedlistingsreducerjs)
        -   [Store Access Patterns](#store-access-patterns)
            -   [Direct Store Access (No Redux Connection)](#direct-store-access-no-redux-connection)
            -   [Connected Components (mapStateToProps)](#connected-components-mapstatetoprops)
        -   [Data Flow Architecture](#data-flow-architecture)
            -   [1. Listings Flow](#1-listings-flow)
            -   [2. Interest Management Flow](#2-interest-management-flow)
            -   [3. User Profile Flow](#3-user-profile-flow)
        -   [Store State Management Strategy](#store-state-management-strategy)
            -   [Middleware: Redux-Promise](#middleware-redux-promise)
            -   [State Updates](#state-updates)
        -   [Component-Store Interaction Map](#component-store-interaction-map)
        -   [Store Performance Considerations](#store-performance-considerations)
            -   [Optimization Strategies](#optimization-strategies)
            -   [State Management Philosophy](#state-management-philosophy)
        -   [Known Store Patterns \& Anti-patterns](#known-store-patterns--anti-patterns)
            -   [✅ Good Patterns](#-good-patterns)
            -   [⚠️ Areas for Improvement](#️-areas-for-improvement)
    -   [Developers](#developers)

## Overview

**One Man's Treasure** is a platform for sharing unwanted items where users can display items they no longer need but don't want to dispose of. Other users can express interest and potentially receive these items based on their claims and a karma-based system.

## Tech Stack

### Backend

-   **Node.js** (v8.11.1) - Runtime environment
-   **Express.js** (v4.16.3) - Web framework
-   **MongoDB** with **Mongoose** (v5.1.2) - Database and ODM
-   **bcrypt** (v1.0.3) - Password hashing
-   **express-session** - Session management
-   **dotenv** - Environment variable management
-   **morgan** - HTTP request logging
-   **cors** - Cross-origin resource sharing
-   **body-parser** - Request body parsing

### Frontend

-   **React** (v16.4.0) - UI framework
-   **Redux** (v4.0.0) with **Redux-Promise** - State management
-   **React-Redux** (v5.0.7) - React-Redux bindings
-   **Semantic UI React** (v0.80.2) - UI component library
-   **Semantic UI** - CSS framework
-   **Axios** (v0.18.0) - HTTP client
-   **jQuery** (v3.3.1) - DOM manipulation and AJAX
-   **Moment.js** (v2.22.2) - Date/time handling

### Build Tools & Development

-   **Webpack** (v2.2.1) - Module bundler
-   **Babel** - JavaScript transpiler (ES2015, React presets)
-   **nodemon** - Development server auto-restart

### External APIs

-   **Google Maps API** - Location services and map display
-   **Imgur API** - Image hosting

## Project Structure

```
one-mans-treasure/
├── client/
│   ├── dist/           # Built files and static assets
│   │   ├── index.html  # Main HTML template
│   │   └── bundle.js   # Webpack compiled bundle
│   └── src/            # React source code
│       ├── components/ # React components
│       ├── actions/    # Redux actions
│       ├── reducers/   # Redux reducers
│       └── services/   # API service functions
├── server/
│   ├── app.js         # Express server entry point
│   ├── routes.js      # API route definitions
│   ├── controllers/   # Route handlers
│   └── services/      # Business logic
├── database/
│   ├── index.js       # Database connection
│   ├── Users.js       # User model and methods
│   ├── Listings.js    # Listing model and methods
│   └── Comments.js    # Comment model
├── package.json       # Dependencies and scripts
├── Procfile          # Heroku deployment config
└── webpack.config.js # Webpack configuration
```

## API Endpoints

### User Management

#### `POST /signup`

**Purpose:** Create new user account
**Request Body:**

```json
{
    "user": "string", // Username
    "pw": "string", // Password (will be hashed)
    "created_at": "Date" // Account creation date
}
```

**Response:** Returns user session data with user object

#### `POST /login`

**Purpose:** User authentication
**Request Body:**

```json
{
    "user": "string", // Username
    "pw": "string" // Password
}
```

**Response:** Returns session data with user object or false if authentication fails

#### `PUT /account/:userId`

**Purpose:** Update user information
**URL Parameters:**

-   `userId` - User ID to update
    **Request Body:**

```json
{
    "user": "string", // New username
    "pw": "string", // New password
    "originalPw": "string" // Original password for verification
}
```

**Response:** Returns updated user information

#### `PUT /interestedUsers`

**Purpose:** Get users interested in a listing
**Request Body:**

```json
{
    "users": ["userId1", "userId2"] // Array of user IDs
}
```

**Response:** Returns array of user objects

#### `POST /user`

**Purpose:** Update user karma
**Request Body:**

```json
{
    "userId": "string", // User ID
    "claimed": "boolean" // true to decrease karma, false to increase
}
```

**Response:** Returns updated user data

### Listings Management

#### `GET /listing`

**Purpose:** Get all available listings (with optional search query)
**Query Parameters:**

-   `query` (optional) - Search term to filter listings by title, description, or location
    **Response:** Returns array of listing objects (limited to 12 results)

#### `POST /listing`

**Purpose:** Create a new listing
**Request Body:**

```json
{
    "title": "string", // Listing title
    "desc": "string", // Description
    "loc": "string", // Location
    "userId": "string", // User ID of the lister
    "image": "string", // Imgur URL for photo
    "username": "string", // Username of the lister
    "comments": [] // Array of comment IDs
}
```

**Response:** Returns saved listing object

#### `PUT /listing/:listingId`

**Purpose:** Update an existing listing
**URL Parameters:**

-   `listingId` - Listing ID to update
    **Request Body:**

```json
{
    "title": "string", // Updated title
    "desc": "string", // Updated description
    "image": "string", // Updated image URL
    "loc": "string" // Updated location
}
```

**Response:** Returns updated listing object

#### `DELETE /listing/:listingId`

**Purpose:** Delete a listing
**URL Parameters:**

-   `listingId` - Listing ID to delete
    **Response:** Returns deleted listing object

#### `GET /fetch/:listingId`

**Purpose:** Get a specific listing with comments
**URL Parameters:**

-   `listingId` - Listing ID to fetch
    **Response:** Returns listing object populated with comments

#### `POST /listing/claimed`

**Purpose:** Get user's claimed listings
**Request Body:**

```json
{
    "listingsId": ["listingId1", "listingId2"] // Array of listing IDs
}
```

**Response:** Returns array of claimed listing objects

#### `POST /listing/give`

**Purpose:** Give away a listing to a specific user
**Request Body:**

```json
{
    "listingId": "string", // Listing ID to give away
    "userId": "string" // User ID to give the listing to
}
```

**Response:** Returns success/failure status

#### `PUT /interest`

**Purpose:** Express/withdraw interest in a listing
**Request Body:**

```json
{
    "id": "string", // Listing ID
    "userId": "string", // User ID expressing interest
    "claimed": "string" // "true" to withdraw interest, "false" to express interest
}
```

**Response:** Returns updated listing object

### Comments

#### `POST /api/comments`

**Purpose:** Add a comment to a listing
**Request Body:**

```json
{
    "listingId": "string", // Listing ID to comment on
    "userId": "string", // User ID of commenter
    "content": "string", // Comment content
    "timestamp": "Date" // Comment timestamp
}
```

**Response:** Returns saved comment object

## Database Schema

### Users Collection

```javascript
{
  username: String (required, unique),
  password: String (hashed, required),
  created_at: Date,
  my_listings: [ObjectId], // References to Listing documents
  claimed: Array,          // Array of claimed listing IDs
  karma: Number (default: 3),
  tokenCount: Number,
  isAdmin: Boolean
}
```

### Listings Collection

```javascript
{
  title: String,
  location: String,
  listedBy: String,           // User ID who created the listing
  isAvailable: Boolean,
  interested_users: Array,    // Array of user IDs interested in the item
  description: String,
  photo: String,             // Imgur URL
  username: String,          // Username of the lister
  comments: [ObjectId],      // References to Comment documents
  createdAt: Date,           // Auto-generated timestamp
  updatedAt: Date            // Auto-generated timestamp
}
```

### Comments Collection

```javascript
{
    // Schema not fully visible in codebase, but referenced in listings
}
```

## Key Features

### Karma System

-   Users start with 3 karma points
-   Karma increases when:
    -   Creating a new listing (+1)
    -   Withdrawing interest from a listing (+1)
-   Karma decreases when:
    -   Expressing interest in a listing (-1)
-   Karma affects user credibility in the platform

### Image Handling

-   Images are uploaded to Imgur via their API
-   Imgur Client ID required in configuration
-   Images are processed before listing creation/update

### Search Functionality

-   Search across listing titles, descriptions, and locations
-   Uses MongoDB regex queries with escaping to prevent injection
-   Limited to 12 results per query

### Session Management

-   Express sessions with cookie-based authentication
-   Sessions configured with security settings
-   User authentication state managed in React components

## Heroku Deployment Setup

### Prerequisites

1. **Heroku CLI** installed
2. **Git** repository initialized
3. **MongoDB Atlas** account (for production database)
4. **Google Maps API** key
5. **Imgur API** key

### Environment Variables Required

Set these in Heroku config vars:

```bash
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname

# Port (automatically set by Heroku)
PORT=process.env.PORT

# API Keys (add these to your config)
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
IMGUR_API_ID=your_imgur_client_id
```

### Deployment Steps

1. **Create Heroku App**

    ```bash
    heroku create your-app-name
    ```

2. **Set Environment Variables**

    ```bash
    heroku config:set MONGODB_URI=your_mongodb_connection_string
    heroku config:set IMGUR_API_ID=your_imgur_client_id
    ```

3. **Update API Keys in Code**

    - Update `client/dist/index.html` line 14 with your Google Maps API key
    - Update `client/src/services/config.js` with your Imgur API ID

4. **Deploy to Heroku**

    ```bash
    git add .
    git commit -m "Prepare for Heroku deployment"
    git push heroku main
    ```

5. **Scale the Application**
    ```bash
    heroku ps:scale web=1
    ```

### Important Notes for Deployment

-   The `Procfile` is already configured: `web: node server/app.js`
-   `postinstall` script automatically runs webpack build
-   Node.js version is pinned to 8.11.1 (consider updating)
-   Static files are served from `client/dist`
-   MongoDB connection uses `process.env.MONGODB_URI` or falls back to localhost

## Required Versions

### Node.js and npm Requirements

-   **Node.js**: 8.11.1 (exact version specified in package.json)
-   **npm**: 6.0.0 (exact version specified in package.json)

## Environment Variables

| Variable              | Description               | Usage                                                                          | Required         |
| --------------------- | ------------------------- | ------------------------------------------------------------------------------ | ---------------- |
| `MONGODB_URI`         | MongoDB connection string | Database connection. Falls back to 'mongodb://localhost/greenfield' if not set | Yes (Production) |
| `PORT`                | Server port number        | Express server port. Defaults to 1128 if not set                               | No               |
| `IMGUR_API_ID`        | Imgur API Client ID       | Image upload functionality via Imgur API                                       | Yes              |
| `IMGUR_API_SECRET`    | Imgur API Secret          | Image upload authentication (currently hardcoded in config.js)                 | Yes              |
| `GOOGLE_MAPS_API_KEY` | Google Maps API Key       | Map display and location services (set in index.html)                          | Yes              |
| `SESSION_SECRET`      | Express session secret    | Session management (⚠️ currently hardcoded as '499xcq3de300op')                | Recommended      |

## Getting Started (Development)

### Prerequisites

-   Node.js 8.11.1 (exact version)
-   MongoDB (local installation or MongoDB Atlas)
-   npm 6.0.0 (exact version)

### Installation

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd one-mans-treasure
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

    ```
    MONGODB_URI=mongodb://localhost/greenfield
    IMGUR_API_ID=your_imgur_client_id
    ```

4. **Update API keys**

    - Add Google Maps API key to `client/dist/index.html`
    - Add Imgur API ID to `client/src/services/config.js`

5. **Start development servers**

    ```bash
    # Terminal 1: Start the Express server
    npm start

    # Terminal 2: Start webpack in watch mode
    npm run react-dev
    ```

6. **Access the application**
    - Open browser to `http://localhost:1128`

## Notable Implementation Details

### Redux Architecture

-   Uses **Redux-Promise** middleware for simplified async actions
-   State includes: listings, claimed listings, and users who claimed items
-   Actions are promise-based, reducing boilerplate code

### Security Considerations

-   Passwords are hashed using bcrypt with salt rounds of 10
-   Session secret is hardcoded (⚠️ **should be moved to environment variables**)
-   MongoDB queries use regex escaping to prevent injection attacks
-   CORS is enabled for cross-origin requests

### Performance Optimizations

-   Listings are limited to 12 results per query
-   MongoDB indexes on username field for faster lookups
-   Webpack bundling for optimized client-side code
-   Static file serving through Express

### Known Issues & Bugs

As documented in the README:

1. Cannot give away items to the first user who claimed it
2. Long comments don't word-wrap properly
3. Listings don't automatically populate in profile (requires logout/login)

### Development Workflow

-   Uses **nodemon** for server auto-restart during development
-   **Webpack** in watch mode for automatic client-side rebuilds
-   **Babel** transpiles ES6+ and JSX to browser-compatible JavaScript
-   **ESLint** configuration present for code quality

## Recommended Improvements

1. **Security Enhancements**

    - Move session secret to environment variables
    - Add input validation and sanitization
    - Implement rate limiting
    - Add HTTPS enforcement

2. **Performance**

    - Implement pagination for listings
    - Add database indexes for search queries
    - Optimize image loading and caching

3. **User Experience**

    - Fix known bugs listed in README
    - Add real-time notifications
    - Implement user profiles with avatars
    - Add listing categories and filters

4. **Technical Debt**

    - Update Node.js version (currently pinned to 8.11.1)
    - Update React and other dependencies
    - Add comprehensive testing suite
    - Implement proper error handling and logging

5. **Features**
    - Add messaging system between users
    - Implement geolocation-based search
    - Add admin panel for moderation
    - Create mobile-responsive design improvements

## Testing

Currently, the application has no test suite implemented. Consider adding:

-   Unit tests for database methods
-   Integration tests for API endpoints
-   React component testing
-   End-to-end testing with tools like Cypress

## Redux Store Architecture

### Store Configuration

**Entry Point:** `client/src/index.jsx`

```javascript
// Store setup with middleware
const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
const store = createStoreWithMiddleware(reducers);
```

### Complete Store Structure Map

```javascript
// Root State Shape (RootReducer.js)
{
  listings: {
    listings: Array<ListingObject>,  // All available listings
    query: String                    // Current search query
  },
  interestedUsers: Array<UserObject>,    // Users interested in specific listing
  claimedListings: Array<ListingObject>  // User's claimed/received listings
}
```

### Detailed Store Breakdown

#### 1. Listings Reducer (`ListingsReducer.js`)

**State Shape:** `{ listings: Array, query: String }`

**Actions & Behaviors:**

-   `FETCH_LISTINGS`: Updates listings array from API response
    -   Preserves existing query state
    -   Used when loading initial listings or search results
-   `SET_QUERY`: Updates search query while preserving listings
    -   Used when user types in search bar
    -   Maintains current listings display
-   `SET_LISTINGS`: Direct local update of listings array
    -   Used for client-side sorting/filtering
    -   No API call, immediate state update

**Action Creators:**

```javascript
// ListingActions.js
fetchListings(query?)     // GET /listing?query=${query}
setQuery(query)           // Local state update
setListings(listings)     // Local array replacement
fetchClaimedListings(ids) // POST /listing/claimed
```

**Connected Components:**

-   `App.jsx` - Main consumer, passes to Listings component
-   `SearchEnhancer.jsx` - Reads directly from store for sorting
-   `NavBar.jsx` - Accesses query state for search display

#### 2. Users Reducer (`UsersReducer.js`)

**State Shape:** `Array<UserObject>` (interested users)

**Actions & Behaviors:**

-   `FETCH_INTERESTED_USERS`: Replaces entire array with users interested in a specific listing
    -   Used when viewing "Give Away" options in user's own listings
    -   Shows list of users who expressed interest

**Action Creators:**

```javascript
// UserActions.js
fetchInterestedUsers(userIds); // PUT /interestedUsers
```

**Connected Components:**

-   `MyListingEntry.jsx` - Shows interested users for giveaway selection

#### 3. Claimed Listings Reducer (`ClaimedListingsReducer.js`)

**State Shape:** `Array<ListingObject>` (user's claimed items)

**Actions & Behaviors:**

-   `FETCH_CLAIMED_LISTINGS`: Replaces array with user's claimed listings
    -   Shows items user has received/claimed
    -   Used in profile modal

**Action Creators:**

```javascript
// ListingActions.js (exports claimed listings action)
fetchClaimedListings(listingIds); // POST /listing/claimed
```

**Connected Components:**

-   `ClaimListings.jsx` - Profile modal showing claimed items

### Store Access Patterns

#### Direct Store Access (No Redux Connection)

```javascript
// Components accessing store directly via import
import store from "../index.jsx";

// Examples:
store.getState().listings.query; // NavBar.jsx, SearchEnhancer.jsx
store.dispatch({ type, payload }); // App.jsx, NavBar.jsx, SearchEnhancer.jsx
```

#### Connected Components (mapStateToProps)

```javascript
// App.jsx
mapStateToProps = ({ listings }) => ({ listings });

// ClaimListings.jsx
mapStateToProps = ({ claimedListings }) => ({ claimedListings });

// MyListingEntry.jsx
mapStateToProps = ({ interestedUsers }) => ({ interestedUsers });
```

### Data Flow Architecture

#### 1. Listings Flow

```
User Action → Component → Action Creator → API Call → Reducer → Component Re-render

Example: Search Listings
User types → NavBar → fetchListings(query) → GET /listing → FETCH_LISTINGS → Listings updates
```

#### 2. Interest Management Flow

```
User Interest → Service Call → Store Update → UI Refresh

Example: Express Interest
Click "Interested" → listingInterestService() → fetchListings() → Store update → Button state change
```

#### 3. User Profile Flow

```
Profile Modal → Fetch Claims → Store Update → Modal Content

Example: View Claimed Items
Open modal → fetchClaimedListings() → FETCH_CLAIMED_LISTINGS → ClaimListings renders list
```

### Store State Management Strategy

#### Middleware: Redux-Promise

-   **Purpose**: Automatically handles promise-based actions
-   **Behavior**:
    -   Action creators return `{type, payload: Promise}`
    -   Middleware resolves promises
    -   Reducers receive `action.payload.data` (resolved value)
-   **Benefits**: Reduces boilerplate for async operations

#### State Updates

1. **API-driven updates**: Most state changes come from server responses
2. **Local updates**: SearchEnhancer sorting, query updates
3. **Hybrid approach**: Interest actions update server then refresh from API

### Component-Store Interaction Map

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   App.jsx       │◄──►│  listings        │◄──►│ Listings.jsx    │
│ (main consumer) │    │  {listings,query}│    │ (display only)  │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       ▲
         │                       │
         ▼              ┌────────┴──────────┐
┌─────────────────┐     │  SearchEnhancer   │
│   NavBar.jsx    │────►│  (direct access)  │
│ (search & home) │     │  store.getState() │
└─────────────────┘     └───────────────────┘

┌─────────────────┐    ┌──────────────────┐
│ MyListingEntry  │◄──►│ interestedUsers  │
│ (giveaway UI)   │    │ Array<User>      │
└─────────────────┘    └──────────────────┘

┌─────────────────┐    ┌──────────────────┐
│ ClaimListings   │◄──►│ claimedListings  │
│ (profile modal) │    │ Array<Listing>   │
└─────────────────┘    └──────────────────┘
```

### Store Performance Considerations

#### Optimization Strategies

1. **Limited API calls**: Store caches listings between searches
2. **Local sorting**: SearchEnhancer sorts in-memory vs. new API calls
3. **Selective updates**: Only interested users fetched when needed
4. **Component-level state**: Session data kept in App.jsx state, not Redux

#### State Management Philosophy

-   **Redux for**: Shareable data (listings, search results, user lists)
-   **Local state for**: UI state, session data, temporary form data
-   **Direct store access**: Used where connect() would be overkill

### Known Store Patterns & Anti-patterns

#### ✅ Good Patterns

-   Promise-based actions with redux-promise middleware
-   Combining API updates with local state updates (App.jsx karma)
-   Using store.getState() for read-only access in utility components

#### ⚠️ Areas for Improvement

-   Mixed patterns: Some components use connect(), others direct access
-   Session management in component state vs. Redux
-   Karma tracking duplicated between local state and user object

## Developers

-   John Webb
-   Mealear Khiev
-   Erwin Carrasquilla
-   Heshie London
