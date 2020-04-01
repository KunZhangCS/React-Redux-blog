import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';

// #3 create a new action.
export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts());

    // const userIds = _.uniq(_.map(getState().posts, 'userId'));
    
    // userIds.forEach(id => dispatch(fetchUser(id)));

    // Refactor with .chain for the above two lines
    _.chain(getState().posts)
        .map('userId')
        .uniq()
        .forEach(id => dispatch(fetchUser(id)))
        .value();
};

export const fetchPosts = () => async dispatch => {
    const response = await jsonPlaceholder.get('/posts');

    dispatch({ type: 'FETCH_POSTS', payload: response.data})
};

// #1 export const fetchUser = (id) => async dispatch => {
//     const response = await jsonPlaceholder.get(`/users/${id}`);

//     dispatch({ type: 'FETCH_USER', payload: response.data} )
//  };

// #2 Using Lodash .memoize to memoize the result and avoid repeating get requests
// However, you can only fetch each user one time only, you cann't refetch different infor from the same user
// export const fetchUser = (id) => dispatch => _fetchUser(id, dispatch); 
    
// const _fetchUser = _.memoize(async (id, dispatch) => {
//     const response = await jsonPlaceholder.get(`/users/${id}`);

//     dispatch({ type: 'FETCH_USER', payload: response.data} )
// });

// #3 
export const fetchUser = id => async dispatch => {
    const response = await jsonPlaceholder.get(`/users/${id}`);

    dispatch({ type: 'FETCH_USER', payload: response.data} )
 };

