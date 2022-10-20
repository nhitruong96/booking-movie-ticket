import './App.css';
import { createBrowserHistory } from 'history';
import { Route, Router, Switch, Redirect } from 'react-router';
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate'
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import News from './pages/News/News';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Detail from './pages/Detail/Detail';
import CheckoutTemplate from './templates/CheckoutTemplate/CheckoutTemplate';
import Checkout from './pages/Checkout/Checkout';
import { UserTemplate } from './templates/UserTemplate/UserTemplate';
import Loading from './components/Loading/Loading';
// import { Suspense, lazy } from 'react';

// const CheckoutTemplateLazy = lazy(() => import('./templates/CheckoutTemplate/CheckoutTemplate'))

// import { BrowserRouter, Route, Redirect } from 'react-router-dom'

// <BrowserRouter>
//    <Switch>
//      <Route
//         path='/'
//         component={SomeComponent}
//      />
//      <Redirect to='/somestuff'/>
//    </Switch>
// </BrowserRouter>

export const history = createBrowserHistory();

function App() {

  return (
    <Router history={history}>
      <Loading />
      <Switch>
        <HomeTemplate path="/booking-movie-ticket/home" exact Component={Home} />
        <HomeTemplate path="/booking-movie-ticket/contact" exact Component={Contact} />
        <HomeTemplate path="/booking-movie-ticket/news" exact Component={News} />
        <HomeTemplate path="/booking-movie-ticket/detail/:id" exact Component={Detail} />
        <Route path="/booking-movie-ticket/register" exact Component={Register} />

        <CheckoutTemplate path="/booking-movie-ticket/checkout/:id" exact Component={Checkout} />

        {/* <Suspense fallback={<div>Loading...</div>}>
          <CheckoutTemplateLazy path="/checkout/:id" exact Component={Checkout} />
        </Suspense> */}
        
        <UserTemplate path="/booking-movie-ticket/login" exact Component={Login} />

        <HomeTemplate path="/booking-movie-ticket/" exact Component={Home} />
        <Redirect to='/booking-movie-ticket/'/>
      </Switch>
    </Router>
  );
}

export default App;