import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import DishDetail from './DishDetailComponent.js';
import About from './AboutComponents.js';
import { connect } from 'react-redux';
import {
  postComment,
  fetchDishes,
  fetchComments,
  fetchPromos,
  fetchLeaders
} from '../redux/action/ActionCreators';
import { actions } from 'react-redux-form';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    leaders: state.leaders,
    promotions: state.promotions,
    comments: state.comments
  };
};

const mapDispatchToProps = dispatch => ({
  postComment: (dishId, comment) => dispatch(postComment(dishId, comment)),
  fetchDishes: () => dispatch(fetchDishes()),
  restFeedbackForm: () => dispatch(actions.reset('feedback')),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders())
});

class MainComponent extends Component {
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          dish={this.props.dishes.dishes.filter(dish => dish.featured)[0]}
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          promotion={
            this.props.promotions.promotions.filter(
              promotion => promotion.featured
            )[0]
          }
          promoLoading={this.props.promotions.isLoading}
          promoErrMess={this.props.promotions.errMess}
          leader={
            this.props.leaders.leaders.filter(leader => leader.featured)[0]
          }
          leadersLoading={this.props.leaders.isLoading}
          leadersErrMess={this.props.leaders.errMess}
        />
      );
    };
    // get dish with id
    const DishWithId = ({ match }) => {
      return (
        <div className='container'>
          <div className='row'>
            <DishDetail
              dish={
                this.props.dishes.dishes.filter(
                  dish => dish.id === parseInt(match.params.dishId, 10)
                )[0]
              }
              isLoading={this.props.dishes.isLoading}
              errMess={this.props.dishes.errMess}
              comments={this.props.comments.comments.filter(
                comment => comment.dishId === parseInt(match.params.dishId, 10)
              )}
              commentsErrMess={this.props.comments.errMess}
              postComment={this.props.postComment}
            ></DishDetail>
          </div>
        </div>
      );
    };

    const RenderLeader = () => {
      return <About leaders={this.props.leaders.leaders} />;
    };

    // declare route path
    return (
      <div className='container'>
        <Header />
        <Switch>
          <Route exact path='/home' component={HomePage} />
          <Route
            exact
            path='/menu'
            render={() => <Menu dishes={this.props.dishes} />}
          />
          <Route path='/menu/:dishId' component={DishWithId} />
          <Route
            exact
            path='/contactus'
            component={() => (
              <Contact restFeedbackForm={this.props.restFeedbackForm} />
            )}
          />
          <Route exact path='/aboutus' component={RenderLeader} />
          <Redirect to='/home' />
        </Switch>
        <Footer />
      </div>
    );
  }
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MainComponent)
);
