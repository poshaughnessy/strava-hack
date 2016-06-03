import React from 'react';
import graph from '../graph';

class HomePage extends React.Component {

  componentDidMount() {
    graph(this.refs.graphContainer);
  }

  render() {
    return (
      <div>
        <header>FitStat</header>
        <div className="main" ref="graphContainer">
        </div>
      </div>
    );
  }

};

export default HomePage;
