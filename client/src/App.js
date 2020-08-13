import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';


import Admin from "./Admin"
import One from "./One"
import OneA from "./OneA"
import OneB from "./OneB"
import Two from "./Two"
import TwoA from "./TwoA"
import TwoB from "./TwoB"
import Conversion from "./Conversion"


function App(){
  return (
    <Switch>
        <Route path="/" component={Admin} exact />
        <Route path="/1" component={One} />
        <Route path="/1a" component={OneA} />
        <Route path="/1b" component={OneB} />
        <Route path="/2" component={Two} />
        <Route path="/2a" component={TwoA} />
        <Route path="/2b" component={TwoB} />
        <Route path="/conversion" component={Conversion} />
    </Switch>
  );
}

export default App;
