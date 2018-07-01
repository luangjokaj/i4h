import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Navigation from '../Components/Navigation';
import Home from '../Views/Home';
import Search from '../Views/Search';
import { Web, AppPage, Portfolio, Animation, Detail } from '../Views/Pages';
import About from '../Views/About';
import NotFound from '../Views/NotFound';

const App = props => (
	<Router>
		<div className="wrapper">
			<Navigation />
			<Switch>
				<Redirect exact from="/1" to="/" />
				<Redirect exact from="/search/" to="/" />
				<Redirect exact from="/animation/1" to="/animation/" />
				<Redirect exact from="/app/1" to="/app/" />
				<Redirect exact from="/portfolio/1" to="/portfolio/" />
				<Redirect exact from="/web/1" to="/web/" />

				<Route 
					exact
					path="/about/"
					component={routeProps => <About {...routeProps} prismicCtx={props.prismicCtx} />}
				/>

				<Route
					exact
					path="/shots/:category/:uid"
					component={routeProps => <Detail {...routeProps} prismicCtx={props.prismicCtx} />}
				/>

				<Route
					exact
					path="/web/"
					component={routeProps => <Web {...routeProps} prismicCtx={props.prismicCtx} />}
				/>
				<Route
					path="/web/:page"
					component={routeProps => <Web {...routeProps} prismicCtx={props.prismicCtx} />}
				/>

				<Route
					exact
					path="/app/"
					component={routeProps => <AppPage {...routeProps} prismicCtx={props.prismicCtx} />}
				/>
				<Route
					path="/app/:page"
					component={routeProps => <AppPage {...routeProps} prismicCtx={props.prismicCtx} />}
				/>

				<Route
					exact
					path="/portfolio/"
					component={routeProps => <Portfolio {...routeProps} prismicCtx={props.prismicCtx} />}
				/>
				<Route
					path="/portfolio/:page"
					component={routeProps => <Portfolio {...routeProps} prismicCtx={props.prismicCtx} />}
				/>

				<Route
					exact
					path="/animation/"
					component={routeProps => <Animation {...routeProps} prismicCtx={props.prismicCtx} />}
				/>
				<Route
					path="/animation/:page"
					component={routeProps => <Animation {...routeProps} prismicCtx={props.prismicCtx} />}
				/>

				<Route
					path="/search/:term/:page?"
					component={routeProps => <Search {...routeProps} prismicCtx={props.prismicCtx} />}
				/>

				<Route
					exact
					path="/"
					component={routeProps => <Home {...routeProps} prismicCtx={props.prismicCtx} />}
				/>
				<Route
					path="/:page"
					component={routeProps => <Home {...routeProps} prismicCtx={props.prismicCtx} />}
				/>

				<Route component={NotFound} />
			</Switch>
		</div>
	</Router>
);

export default App;
