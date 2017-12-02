import * as constants from '../constants'
export const LOGIN_TYPE = 'login/LOGIN'
import { push } from 'react-router-redux'

// eslint-disable-next-line complexity
const callback = async (data, dispatch) => {
    dispatch()
    return data
  }

export const login = (data) => (dispatch) =>
    dispatch({
    type: LOGIN_TYPE,
    payload: callback(data, dispatch), // eslint-disable-line promise/prefer-await-to-callbacks
    meta: { data },
    })
