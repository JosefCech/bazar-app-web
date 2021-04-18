import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator } from 'aws-amplify-react'
import Amplify, { Auth } from 'aws-amplify';
import { BrowserRouter as Router,    Switch,
  Route,
  Link} from "react-router-dom";
import StoreItemsTable from "./StoreItems/StoreItemsTable"
import { DefaultLayout } from "./layouts";
import routes from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";
//import aws_exports from './aws-exports';
//Amplify.configure(aws_exports);

   const characters = [

   {
        name: 'Charlie',
        job: 'Janitor',
      },
      {
        name: 'Mac',
        job: 'Bouncer',
      },
      {
        name: 'Dee',
        job: 'Aspring actress',
      },
      {
        name: 'Dennis',
        job: 'Bartender',
      },
    ]





const props =  {'characterData' : characters}
class App extends Component {
  render() {
return (
  <div className="App">
   <Router basename={process.env.REACT_APP_BASENAME || ""}>
    <div>
      {routes.map((route, index) => {

        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={ ()  => {  return <route.layout { ...props}>
                  <route.component {...props} />
                </route.layout> }
            }
          />
        );
      })}
    </div>
  </Router>
  </div>
);
}
}

/*class App extends Component {
  render() {
        const characters = [
      {
        name: 'Charlie',
        job: 'Janitor',
      },
      {
        name: 'Mac',
        job: 'Bouncer',
      },
      {
        name: 'Dee',
        job: 'Aspring actress',
      },
      {
        name: 'Dennis',
        job: 'Bartender',
      },
    ]

    return (


      <div className="App">


      </div>

    );
  }
}
*/
//export default withAuthenticator(App, true);
export default App;
