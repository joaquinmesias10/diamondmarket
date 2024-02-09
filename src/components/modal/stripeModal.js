import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {StripeProvider} from 'react-stripe-elements';
import StripeCheckoutForm from '../stripeCheckoutForm';
import {stripe_public_key} from '../../utils/constant';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  textfield : {
    marginTop : 20
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6" style={{textAlign: 'center'}}>{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function StripeCheckoutDialogs(props) {
  const {onClose,onPay, ...rest} = props;
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(props.open)
  }, [props.open])
  
  const handleClose = () => {
    onClose();
  };

  return (
      <Dialog style = {{zIndex : 1350}}  aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <h5>輸入信用卡資料</h5>
        </DialogTitle>
        <DialogContent >
          <div className="padding-20" style={{width: 350}}>
          <StripeProvider apiKey={stripe_public_key}>
            <StripeCheckoutForm onPay={onPay}/>
          </StripeProvider>
          </div>
        </DialogContent>
      </Dialog>
  );
}
