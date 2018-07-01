import React, { Component } from 'react';
import classNames from 'classnames';
import { Helmet } from 'react-helmet';
import NotFound from '../NotFound';
import Prismic from 'prismic-javascript';
import { Grid } from '../../Components/Layout';
import Tile from '../../Components/Tile';
import { NavLink, Link } from 'react-router-dom';
import AppearAfter from '../../Components/AppearAfter';
import Loading from '../../Components/Layout/Loading';
import { Filter } from '../../assets/svg';
import ReactGA from 'react-ga';
import './Category.css';

ReactGA.initialize('UA-120213712-1');

export default class Help extends Component {
	state = {
		doc: null,
		notFound: false,
		filters: {
			all: true,
			ios: false,
			android: false,
			desktop: false,
		},
	};

	componentWillMount() {
		this.loadPage(this.props);
		ReactGA.ga('send', 'pageview', `${this.props.location.pathname}`);
	}

	componentWillReceiveProps(nextProps) {
		this.loadPage(nextProps);
	}

	componentWillUnmount() {
		this.resetState();
	}

	fetchPage(props, param1, param2) {
		if (props.prismicCtx) {
			return props.prismicCtx.api
				.query(Prismic.Predicates.at(param1, param2), {
					orderings: '[document.last_publication_date desc]',
					page: props.match.params.page || 1,
					pageSize: 28,
				})
				.then(response => {
					console.log(response);
					this.resetState();
					if (response.results_size > 0) {
						this.setState({ doc: response });
						console.log(this.state);
					} else {
						this.setState({ notFound: true });
					}
				})
				.catch(error => {
					this.setState({ notFound: true });
				});
		}
		return null;
	}

	resetState = () => {
		this.setState({
			doc: null,
			notFound: false,
		});
	};

	loadPage = props => {
		this.fetchPage(props, 'document.type', 'app');
		this.setState({
			filters: {
				all: true,
				ios: false,
				android: false,
				desktop: false,
			},
		});
	};

	loadIos = props => {
		this.fetchPage(props, 'my.app.category', 'iOS');
		this.setState({
			filters: {
				all: false,
				ios: true,
				android: false,
				desktop: false,
			},
		});
	};

	loadAndroid = props => {
		this.fetchPage(props, 'my.app.category', 'Android');
		this.setState({
			filters: {
				all: false,
				ios: false,
				android: true,
				desktop: false,
			},
		});
	};

	loadWebapp = props => {
		this.fetchPage(props, 'my.app.category', 'Desktop');
		this.setState({
			filters: {
				all: false,
				ios: false,
				android: false,
				desktop: true,
			},
		});
	};

	render() {
		const { doc } = this.state;

		if (doc) {
			let pagesArray = [];
			for (let i = 0; i < doc.total_pages; i++) {
				let url = '/app/' + (i + 1);
				pagesArray.push(
					<li key={i}>
						<NavLink to={url}>{i + 1}</NavLink>
					</li>
				);
			}

			if (this.props.match.params.page > doc.total_pages) {
				return <NotFound />;
			}

			return (
				<div className="page-wrapper">
					<Helmet>
						<title>App • Interfaces 4 Humans</title>
					</Helmet>
					<div>
						<AppearAfter className="page-head">
							<div>
								<h1>
									<Link to="/app">App</Link>
								</h1>
								<div className="filters">
									<Filter />
									<button
										onClick={this.loadPage}
										className={classNames({
											active: this.state.filters.all,
										})}
									>
										All
									</button>
									<button
										onClick={this.loadIos}
										className={classNames({
											active: this.state.filters.ios,
										})}
									>
										iOS
									</button>
									<button
										onClick={this.loadAndroid}
										className={classNames({
											active: this.state.filters.android,
										})}
									>
										Android
									</button>
									<button
										onClick={this.webapp}
										className={classNames({
											active: this.state.filters.desktop,
										})}
									>
										Desktop
									</button>
								</div>
							</div>
						</AppearAfter>
						<Grid>
							{doc &&
								doc.results.map(item => (
									<Tile
										key={item.id}
										image={item.data.image && item.data.image.url}
										alt={item.data.image && item.data.image.alt}
										url={item.uid}
										type={item.type}
										animation={item.data.animation && item.data.animation.url}
									/>
								))}
						</Grid>

						<AppearAfter className="pagination">
							<ul>{pagesArray}</ul>
						</AppearAfter>
					</div>
				</div>
			);
		} else if (this.state.notFound) {
			return <NotFound />;
		}

		return <Loading />;
	}
}
