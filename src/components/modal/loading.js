import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: 1400,
    color: '#fff',
  },
}));

const LoadingModal=(props)=> {
  const classes = useStyles();

  return (
    <div>
      <Backdrop className={classes.backdrop} open={props.loading} >
        <div style={{display : 'flex', flexDirection : 'column', justifyContent : 'center', alignItems : 'center'}}>
          <CircularProgress color="inherit" />
          <div>{props.msg}</div>
        </div>
      </Backdrop>
    </div>
  );
}

const mapstate_props = (state)=> {
  return {loading : state.loadingReducer.loading, msg : state.loadingReducer.msg}
}
export default connect(mapstate_props)(LoadingModal);