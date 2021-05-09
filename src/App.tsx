import Table from './components/Table';
import Dashboard from './components/Dashboard';
import Navigation from './components/Navigation';
import { Route, Switch } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = 'https://ruota-di-scorta.azurewebsites.net/web-api';

function App() {
  const [countries, setCountries] = useState([]);
  //Fetching countries
  useEffect(() => {
    axios
      .get(`${baseUrl}/countries`)
      .then((response) => {
        console.log(response.data);
        setCountries(response.data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <Navigation />
      <Switch>
        <Route exact path='/'>
          <Table countries={countries} />
        </Route>
        <Route path='/dashboard'>
          <Dashboard countries={countries} />
        </Route>
      </Switch>
    </>
  );
}

export default App;
