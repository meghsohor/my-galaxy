import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Container from '@material-ui/core/Container';
import { Navbar, Universes, Stars, AddEditUniverse, UniverseDetails, AddEditStar, StarDetails } from './components';

const Imprint = React.lazy(() => import('./components/imprint/Imprint'));

function App() {
  return (
    <React.Fragment>
      <React.Suspense fallback={null}>
        <Router>
          <Navbar />
          <Container fixed>
            <Switch>
              <Route path="/universes" exact>
                <Universes />
              </Route>
              <Route path="/universes/add">
                <AddEditUniverse />
              </Route>
              <Route path="/universes/:id/edit">
                <AddEditUniverse />
              </Route>
              <Route path="/universes/:id">
                <UniverseDetails />
              </Route>
              {/* Star Routes */}
              <Route path="/stars" exact>
                <Stars />
              </Route>
              <Route path="/stars/add">
                <AddEditStar />
              </Route>
              <Route path="/stars/:id/edit">
                <AddEditStar />
              </Route>
              <Route path="/stars/:id">
                <StarDetails />
              </Route>

              <Route path="/imprint">
                <Imprint />
              </Route>

              <Redirect to="/universes" />
            </Switch>
          </Container>
        </Router>
      </React.Suspense>
    </React.Fragment>
  );
}

export default App;
