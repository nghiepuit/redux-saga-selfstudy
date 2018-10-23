import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  }
});

class TaskForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      title: '',
      description: ''
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleClose = () => {
    const {onClose} = this.props;
    onClose(false);
  }

  handleSave = () => {
    const {onSave} = this.props;
    const {id, title, description} = this.state;
    onSave({
      id,
      title,
      description
    });
  }

  render() {
    const {classes, open} = this.props;
    const {id} = this.state;
    return (
      <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">{id ? "Update Infomation" : "Add New"}</DialogTitle>
        <DialogContent>
          <form className={classes.container} noValidate autoComplete="off">
            <TextField
              id="standard-name"
              label="Title"
              className={classes.textField}
              value={this.state.name}
              onChange={this.handleChange('title')}
              margin="normal"
            />
            <TextField
              id="standard-multiline-flexible"
              label="Description"
              multiline
              rowsMax="4"
              value={this.state.description}
              onChange={this.handleChange('description')}
              className={classes.textField}
              margin="normal"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Close
          </Button>
          <Button onClick={this.handleSave} color="primary" autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default withStyles(styles)(TaskForm);