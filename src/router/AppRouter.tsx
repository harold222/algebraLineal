import React from "react";
import { Navbar } from '../components/shared/Navbar';
import { Determinante } from '../components/determinantes/Determinante';
import { ValorPropio } from '../components/valoresPropios/Valorpropio';
import { Inversa } from '../components/inversa/Inversa';
import {
  BrowserRouter as Router,
  Switch,
  Route, Redirect
} from "react-router-dom";

export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Navbar/>

                <Switch>
                    <Route exact path="/" component={Determinante}/>
                    <Route exact path="/determinante" component={Determinante}/>
                    <Route exact path="/valor" component={ValorPropio}/>
                    <Route exact path="/inversa" component={Inversa}/>

                    <Redirect to="/determinante"/>
                </Switch>
            </div>
        </Router>
    )
}

