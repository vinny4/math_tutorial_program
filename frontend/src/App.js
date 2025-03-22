import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

// Components
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import StudentDashboard from './components/dashboard/StudentDashboard';
import ParentDashboard from './components/dashboard/ParentDashboard';
import AdminDashboard from './components/dashboard/AdminDashboard';
import ContentList from './components/content/ContentList';
import ContentDetail from './components/content/ContentDetail';
import ProgressReport from './components/progress/ProgressReport';
import TermManagement from './components/terms/TermManagement';
import PrivateRoute from './components/routing/PrivateRoute';

// Styles
import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Alert />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/student-dashboard" component={StudentDashboard} />
            <PrivateRoute exact path="/parent-dashboard" component={ParentDashboard} />
            <PrivateRoute exact path="/admin-dashboard" component={AdminDashboard} />
            <PrivateRoute exact path="/content" component={ContentList} />
            <PrivateRoute exact path="/content/:id" component={ContentDetail} />
            <PrivateRoute exact path="/progress/:userId" component={ProgressReport} />
            <PrivateRoute exact path="/terms" component={TermManagement} />
            <Redirect to="/" />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
