import logo from './logo.svg';
import './App.css';
import {Component} from "react";
import Router, {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./Home";

class App extends Component {
 state = {
   userDetails: []
 };

 async componentDidMount() {
   const response = await fetch('/v1/userDetails');
   const body = await response.json();
   this.setState({userDetails: body})
 }

 render() {
   /*const {userDetails} = this.state;
   return (
       <div className="App">
         <header className="App-header">
           <img src={logo} className="App-logo" alt="logo" />
           <div className="App-intro">
             <h2>User Details</h2>
             {userDetails.map(userDetail =>
                 <div key={userDetail.id}>
                   {userDetail.emailAddress} ({userDetail.id})
                 </div>
             )}
           </div>
         </header>
       </div>
   );*/
     return (
         <Router>
             <Switch>
                 <Route path='/' exact={true} component={Home}></Route>
                 {/*<Route path='/' exact={true} component={Home}></Route>
                 <Route path='/' exact={true} component={Home}></Route>*/}
             </Switch>
         </Router>
     )
 }
}

export default App;
