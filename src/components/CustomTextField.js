// Library
import React from 'react'
import PropTypes from 'prop-types'

// Material UI
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  title: {
    display: 'flex',
    alignItems: 'center',
    '& h6': {
      paddingTop: '8px'
    }
  },
});

function CustomTextField(props) {

  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={4} className={classes.title}>
        <Typography variant="subtitle1" gutterBottom>
          {props.title}
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <TextField 
          margin="dense" 
          variant="outlined" 
          name={props.name}
          value={props.value}
          onChange={props.handleChange}
          helperText={props.error && props.errorMsg}
          error={props.value.trim() === "" || props.error}
        />
      </Grid>
    </Grid>
  );
}

CustomTextField.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  errorMsg: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
}

export default CustomTextField;