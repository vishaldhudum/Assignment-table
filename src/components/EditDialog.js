// Library
import React from 'react';
import { connect } from 'react-redux'

// Material UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

// Action
import { saveEditUser, toggleEditDialogue } from '../action/crudAction'

// Component
import CustomTextField from './CustomTextField'

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

function EditDialog(props) {
  
  const classes = useStyles();
  const [state, setState] = React.useState({id: 0, name: "", email: "", username: ""})
  const [emailError, setEmailError] = React.useState(false)

  React.useEffect(()=>{
    if(props.user.id !== 0){
      setState(props.user);
    }
  }, [props.user]);

  const handleClose = () => {
    props.toggleDialogue();
    setEmailError(false);
  };

  const handleSave = () => {
    if(validateUser())
    props.saveEditUser(state);
  }

  function handleChange(event) {
    if(event.target.name === 'email'){
      setEmailError(false);
    }
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  }

  function validateUser(){
    for (const key in state) {
      if(key === 'email'){
        const regex =  /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g;
        let isValid = regex.test(state[key])
        setEmailError(!isValid);
        if(!isValid)
          return isValid;
      } else if (key !== 'id') {
        if(!state[key] || state[key].trim() === ""){
          return false;
        }
      }
    }
    return true;
  }

  return (
    <div>
      <Dialog open={props.showEditDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
        <MuiDialogTitle disableTypography className={classes.root}>
          <Typography variant="h6">Edit</Typography>
          <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </MuiDialogTitle>
        <DialogContent>
          <CustomTextField title="Name" name='name' value={state.name} handleChange={handleChange} />
          <CustomTextField title="Username" name='username' value={state.username} handleChange={handleChange} />
          <CustomTextField title="Email" name='email' value={state.email} handleChange={handleChange} error={emailError} errorMsg="Please enter a valid Email"/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = state => ({
  showEditDialog: state.showEditDialog,
  user: state.editUser
})

const mapDispatchToProps = dispatch => ({
  toggleDialogue: () => dispatch(toggleEditDialogue({id: 0})),
  saveEditUser: (user) => dispatch(saveEditUser(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditDialog)