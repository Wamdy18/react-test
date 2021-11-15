import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { DISHES } from '../shared/dishes';
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      // selectedDish: null удалили
    };
  }

    // onDishSelect(dishId) {
    //     this.setState({ selectedDish: dishId });
    // } удалили

  render() {
    
    const HomePage = () => {
      return(
        <Home />
      );
    }
    
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />} />
          <Redirect to="/home" />
        </Switch>
        {/* и его удалили <Menu dishes={this.state.dishes}  */}
            {/* onClick={(dishId) => this.onDishSelect(dishId)} */}
        {/* /> */}
        {/* удалили <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]}/> */}
        <Footer />
      </div>
    );
  }
}

export default Main;
