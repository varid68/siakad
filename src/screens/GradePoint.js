import React from 'react';
import { BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { Container } from 'native-base';

import PropTypes from 'prop-types';

import StatusBarComp from '../components/StatusBarComp';
import Header from '../components/grade-point/MyHeader';
import PointTotal from '../components/grade-point/PointTotal';
import TabContainer from '../components/grade-point/TabContainer';

import { resetDrawer } from '../actions/directive';
import { fetchPoint, fetchIndeks } from '../actions/provider';

class GradePoint extends React.Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    resetDrawer: PropTypes.func.isRequired,
  };

  static navigatorStyle = {
    navBarHidden: true,
    statusBarColor: 'rgba(0,0,0,0.2)',
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  onNavigatorEvent(event) {
    switch (event.id) {
      case 'willDisappear':
        this.handleBackPress();
        break;

      default:
        break;
    }
  }

  handleBackButton = () => {
    this.props.resetDrawer();
  }

  handleBackPress = () => {
    this.props.navigator.popToRoot({
      animated: false,
    });
  }

  render() {
    return (
      <Container>
        <StatusBarComp />
        <Header
          {...this.props}
          title="Grade Point Average"
          fromTab />
        <PointTotal {...this.props} />
        <TabContainer {...this.props} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  fetching: state.providerReducer.fetching,
  point: state.providerReducer.point,
  user: state.directiveReducer.user,
  indeks: state.providerReducer.indeks,
});

const mapDispatchToProps = dispatch => ({
  resetDrawer: () => dispatch(resetDrawer()),
  fetchPoint: nim => dispatch(fetchPoint(nim)),
  fetchIndeks: nim => dispatch(fetchIndeks(nim)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GradePoint);
