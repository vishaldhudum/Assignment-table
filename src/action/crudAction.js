// Actions
export const toggleEditDialogue = (user) => ({ type: actionType.toggleEditDialogue, user });
export const saveEditUser = (user) => ({ type: actionType.saveEditUser, user });

// Action type
export const actionType = {
  toggleEditDialogue: 'toggleEditDialogue',
  saveEditUser: 'saveEditUser'
};