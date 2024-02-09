import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {SHOW_ALERT, DISMISS_ALERT} from '../../redux_helper/constants/action-types';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AlertMessage =(props)=> {

  const onExit = () => {
      props.dispatch({type : DISMISS_ALERT, payload : ''})
  }
  const onClose = () => {
    props.dispatch({type : DISMISS_ALERT, payload : ''})
  }

  return (
    <Snackbar open={props.message == '' ? false : true} autoHideDuration={4000} anchorOrigin={{vertical: 'top', horizontal : 'right' }} onClose={onClose} onExit = {onExit}>
        <Alert severity={props.type}>
          {props.message}
        </Alert>
    </Snackbar>
  );
}

const mapstate_props=(state)=>{
    return {
      type : state.alertReducer.type ,
      message : state.alertReducer.msg
    }
}
export default connect(mapstate_props)(AlertMessage);