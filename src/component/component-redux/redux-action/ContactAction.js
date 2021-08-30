import axios from "axios";
import { 
  ALERT_CLOSE,
  ALERT_MESSAGE, 
  CONTACT_API, 
  DETAIL_CONTACT, 
  LIST_CONTACT } from "../../utils";

const headers = {
  "content-type": "application/json; charset=utf-8",
}

export const getContact = () => async (dispatch) => {
  try {
    const result = await axios.get(CONTACT_API, headers);
    dispatch({
      type: LIST_CONTACT,
      payload: result.data.data
    });
  } catch (error) {
    console.log(error);
  }
};
export const detailContact = (id) => async (dispatch) => {
  try {
    const result = await axios.get(CONTACT_API + '/' + id, headers);
    dispatch({
      type: DETAIL_CONTACT,
      payload: result.data.data
    });
  } catch (error) {
    console.log(error);
  }
};
export const addContact = (data) => async (dispatch) => {
  try {
    const result = await axios.post(CONTACT_API, data, headers);
    dispatch(popUp(
      {type: 'success', message: result.data.message}
    ));
  } catch (error) {
    console.log(error);
  }
};
export const deleteContact = (id) => async (dispatch) => {
  try {
    const result = await axios.delete(CONTACT_API + '/' + id, headers);
    dispatch(popUp(
      {type: 'success', message: result.data.message}
    ));
  } catch (error) {
    dispatch(popUp(
      {type: 'danger', message: 'Server Error'}
    ));
  }
};
export const updateContact = (data, id) => async (dispatch) => {
  try {
    const result = await axios.put(CONTACT_API + '/' + id, data, headers);
    dispatch(popUp(
      {type: 'success', message: result.data.message}
    ));
  } catch (error) {
    dispatch(popUp(
      {type: 'danger', message: 'Server Error'}
    ));
  }
};

export const popUp = ({type, message}) => async (dispatch) => {
  try {
    dispatch({
      type: ALERT_MESSAGE,
      payload : {
        type : type,
        message : message
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const closePopUp = () => async (dispatch) => {
  try {
    dispatch({
      type: ALERT_CLOSE,
    });
  } catch (error) {
    console.log(error);
  }
};