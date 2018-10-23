import React, { Component } from 'react';
import './App.css';
import TaskPage from './containers/TaskPage';
import {connect} from 'react-redux';
import {createTask, updateTask, fetchTasks} from './redux/actions/TaskAction';
import FlashMessage from './components/FlashMessage';

class App extends Component {

  componentDidMount() {
    this.props.fetchTasks();
  }

  onSaveTask = data => {
    const {onAddTask} = this.props;
    onAddTask(data);
  }

  onChangeStatus = (id, newStatus) => {
    const {updateStatus} = this.props;
    updateStatus(id, {
      status: newStatus
    });
  }

  render() {
    const {tasks, loading, error, success} = this.props.tasks;

    let message = null;
    let type = null;
    if (error) {
      message = "Occur an error!";
      type = "error";
    } else if (success) {
      message = "Successfully!"
      type="success";
    } else {
      message = null;
      type = null;
    }

    let open = false;
    if (message && type) {
      open = true;
    }

    return (
      <div className="main-content">
        <FlashMessage type={type} message={message} open={open}/>
        <TaskPage 
          tasks={tasks} 
          saveTask={this.onSaveTask} 
          changeStatus={this.onChangeStatus}
          loading={loading}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.tasks
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onAddTask: ({title, description}) => {
      dispatch(createTask({title, description}))
    },
    updateStatus: (id, params = {}) => {
      dispatch(updateTask(id, params));
    },
    fetchTasks: () => {
      dispatch(fetchTasks());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
