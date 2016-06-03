import React, {PropTypes} from 'react';
import {Router, Route} from 'react-router';

// Pages
import HomePage from './components/Home.jsx';

class Root extends React.Component {

  constructor() {
    super();
  }

  render() {
    // layout(HomePage)
    return (
      <Router history={this.props.history}>
        <Route name="root" path="/" component={HomePage}/>
      </Router>
    );
  }

}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default Root;
