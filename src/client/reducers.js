export default (state, action) => {
  switch (action.type) {

    case 'TOGGLE_SIDEBAR':
      return Object.assign({}, state, {
        sidebarExpanded: !state.sidebarExpanded
      });

    default:
      return state
  }
};
