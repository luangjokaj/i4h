import React, { Component } from 'react';
import Prismic from 'prismic-javascript';
import { Helmet } from 'react-helmet';
import NotFound from '../NotFound';
import { NavLink } from 'react-router-dom';
import { Grid } from '../../Components/Layout';
import AppearAfter from '../../Components/AppearAfter';
import Tile from '../../Components/Tile';
import Loading from '../../Components/Layout/Loading';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-120213712-1');

export default class Search extends Component {
	state = {
		doc: null,
		notFound: false,
	};

	componentWillMount() {
		this.fetchPage(this.props);
		ReactGA.ga('send', 'pageview', `${this.props.location && this.props.location.pathname}`);
	}

	componentWillReceiveProps(nextProps) {
		this.fetchPage(nextProps);
		console.log(nextProps, 'hopa');
	}

	componentWillUnmount() {
		this.resetState();
	}

	resetState = () => {
		this.setState({
			doc: null,
			notFound: false,
		});
	};

	fetchPage(props) {
		setTimeout(() => {
			if (props.prismicCtx) {
				return props.prismicCtx.api
					.query(
						[
							Prismic.Predicates.any('document.type', ['web', 'app', 'portfolio', 'animation']),
							Prismic.Predicates.fulltext('document', this.props.match.params.term || ''),
						],
						{
							orderings: '[document.last_publication_date desc]',
							page: props.match.params.page || 1,
							pageSize: 28,
						}
					)
					.then(response => {
						console.log(response);
						this.resetState();
						if (response.results_size > 0) {
							this.setState({ doc: response });
							console.log(this.state);
						} else {
							this.setState({ notFound: true });
						}
					});
			}
			return null;
		}, 100);
	}

	render() {
		const { doc } = this.state;
		const { match } = this.props;

		if (doc) {
			let pagesArray = [];
			let termQuery = match.params.term ? match.params.term + '/' : '';
			for (let i = 0; i < doc.total_pages; i++) {
				let url = '/search/' + termQuery + (i + 1);
				pagesArray.push(
					<li key={i}>
						<NavLink to={url}>{i + 1}</NavLink>
					</li>
				);
			}

			return (
				<div className="page-wrapper">
					<Helmet>
						<title>Search • Interfaces 4 Humans</title>
					</Helmet>
					<div>
						<AppearAfter className="page-head">
							<div>
								<h1>
									Search results for: <span>{match.params.term && match.params.term}</span>
								</h1>
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

						<AppearAfter className="pagination" delay={1000}>
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
