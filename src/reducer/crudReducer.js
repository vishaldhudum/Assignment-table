// Action
import {actionType} from '../action/crudAction'

// JSON
import defaultData from '../assets/json/defaultData.json';

function getInitialState() {
  return {
    rows: defaultData,
    showEditDialog: false,
    editUser: {id: 0, name: "", email: "", username: ""},
  }
}

const crudReducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case actionType.toggleEditDialogue:
      return {
        ...state,
        showEditDialog: !state.showEditDialog,
        editUser: action.user
      }
    case actionType.saveEditUser:
      return {
        ...state,
        showEditDialog: false,
        rows: getUpdatedRows(action.user, state.rows)
      }
    default:
      return state
  }
}

function getUpdatedRows(user, rows){
  rows.forEach(row => {
    if(row.id === user.id){
      row.name = user.name;
      row.username = user.username;
      row.email = user.email;
      return;
    }
  });
  return rows;
}

export default crudReducer