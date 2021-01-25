import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import * as RouteLists from './router/router'
import Layout from './hoc/Layout/Layout'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  let routerList = RouteLists.RouteAll.map((key) => {
    return <Route
        key={key.name}
        path={key.path}
        render={key.render}/>

  });

  let routes = (
      <BrowserRouter>
        <Switch>
          {routerList}
        </Switch>
      </BrowserRouter>
  )

  return (
    <div className="App">

        <Layout>
            {routes}
        </Layout>
        <ToastContainer />
    </div>
  );
}

export default App;
