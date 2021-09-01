import { 
  ALERT_CLOSE,
  ALERT_MESSAGE,
  DETAIL_CONTACT, 
  LIST_CONTACT 
} from '../../utils';
const initialState = {
  list_contact : [],
  detail_contact : null,
  message : null,
  show : false,
};

const ContactReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case LIST_CONTACT :
      return {
        ...state,
        list_contact : payload
      };
    case DETAIL_CONTACT :
      return {
        ...state,
        detail_contact : payload
      };
    case ALERT_MESSAGE :
      return {
        ...state,
        message : payload,
        show : true
      };
    case ALERT_CLOSE :
      return {
        ...state,
        message : null,
        show : false
      }; 
    default:
      return state;
    }
};

export default ContactReducer;