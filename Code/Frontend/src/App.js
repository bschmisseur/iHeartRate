import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Cookies from 'universal-cookie';

function App() {
  const cookies = new Cookies();

  return (
    <div className="App">
      <Router>
        <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/Dashboard">
          <Dashboard/>
        </Route>
        <Route path='/logout' component={() => { 
            cookies.remove('currAppleId')
            cookies.remove('displayName')
            window.location.pathname = '/'; 
            return null;
        }}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
