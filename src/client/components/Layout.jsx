import React from 'react';
import classnames from 'classnames';
import Sidebar from './Sidebar.jsx';
import AppStore from '../../stores/AppStore';
import AppActions from '../../actions/AppActions';

class Inner extends React.Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.expandedMenu === this.props.expandedMenu;
  }

  render() {
    return (
      <div className="inner-main" id='inner-main'>
        {this.props.children}
      </div>
    );
  }
}

Inner.propTypes = {
  expandedMenu: React.PropTypes.bool,
  children: React.PropTypes.any
};

export default (Component) => {
  class Layout extends React.Component {

    constructor(props) {
      super(props);
      this.state = this.getDefaultState();
      this._listenForAppStoreChanges = this._listenForAppStoreChanges.bind(this);
      this._hideSidebar = this._hideSidebar.bind(this);
    }

    // LIFECYCLE

    componentWillMount() {
      AppStore.addChangeListener(this._listenForAppStoreChanges);
    }

    componentWillUnmount() {
      AppStore.removeChangeListener(this._listenForAppStoreChanges);
    }

    // METHODS

    getDefaultState() {
      return {
        menuExpanded: AppStore.isMenuExpanded()
      };
    }

    isDescendant(parent, child) {
      let node = child.parentNode;
      while (node !== null) {
        if (node === parent) {
          return true;
        }
        node = node.parentNode;
      }
      return false;
    }

    _listenForAppStoreChanges() {
      this.setState(this.getDefaultState(), () => {
        if (this.state.menuExpanded) {
          document.getElementsByClassName('inner-main')[0].addEventListener('click', this._hideSidebar, true);
        } else {
          document.getElementsByClassName('inner-main')[0].removeEventListener('click', this._hideSidebar, true);
        }
      });
    }

    _hideSidebar(event) {
      if (this.state.menuExpanded) {
        if (this.isDescendant(document.getElementById('inner-main'), event.target) && event.target.id !== 'toggle-menu') {
          event.preventDefault();
          event.stopPropagation();
          AppActions.toggleSidebar();
        }
      }
    }

    // RENDER

    _renderSidebar() {
      if (this.state.menuExpanded) {
        return <Sidebar />;
      }
    }

    render() {

      let cx = classnames({
        'app-main': true,
        'menu-expanded': this.state.menuExpanded
      });

      return (
        <div className={cx} onClick={this._hideSidebar}>
          <Inner onClick={this._hideSidebar}>
            <Component {...this.props} />
          </Inner>
          {this._renderSidebar()}
        </div>
      );
    }

  }

  Layout.propTypes = {
    expandedMenu: React.PropTypes.object,
    children: React.PropTypes.any
  };

  Layout.contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  return Layout;
};
