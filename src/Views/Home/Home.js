import React, { Component } from 'react';
import Prismic from 'prismic-javascript';
import { Helmet } from 'react-helmet';
import NotFound from '../NotFound';
import { Grid } from '../../Components/Layout';
import Tile from '../../Components/Tile';
import { NavLink } from 'react-router-dom';
import AppearAfter from '../../Components/AppearAfter';
import Loading from '../../Components/Layout/Loading';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-120237829-1')

export default class Help extends Component {
	state = {
		doc: null,
		notFound: false,
	};

	componentWillMount() {
		this.fetchPage(this.props);
		ReactGA.ga('send', 'pageview', `/${this.props.match.params.page ? this.props.match.params.page : ''}`);
	}

	componentWillReceiveProps(nextProps) {
		this.fetchPage(nextProps);
	}

	componentWillUnmount() {
		this.setState({
			doc: null,
			notFound: false,
		});
	}

	fetchPage(props) {
		if (props.prismicCtx) {
			return props.prismicCtx.api
				.query(Prismic.Predicates.any('document.type', ['web', 'app', 'portfolio', 'animation']), {
					orderings : '[document.last_publication_date desc]',
					page: props.match.params.page || 1,
					pageSize: 28,
				})
				.then(response => {
					console.log(response);
					this.setState({ doc: response });
					if (response.results_size > 0) {
						console.log(this.state);
					} else {
						this.setState({ notFound: true });
					}
				}).catch(error => {
					this.setState({ notFound: true });
				});
		}
		return null;
	}

	render() {
		const { doc } = this.state;

		if (doc) {
			let pagesArray = [];
			for (let i = 0; i < doc.total_pages; i++) {
				let url = '/' + (i + 1);
				pagesArray.push(<li key={i}><NavLink to={url}>{i + 1}</NavLink></li>);
			}

			return (
				<div className="page-wrapper">
					<Helmet>
						<title>Interfaces 4 Humans</title>
					</Helmet>
					<div>
						<Grid>
							{doc && doc.results.map(item => (
								<Tile key={item.id} image={item.data.image && item.data.image.mobile.url} alt={item.data.image && item.data.image.alt} url={item.uid} type={item.type} animation={item.data.animation && item.data.animation.mobile.url} />
							))}
						</Grid>

						<AppearAfter className="pagination" delay={1000}>
							<ul>{pagesArray}</ul>
						</AppearAfter>
					</div>
				</div>
			);
		}

		else if (this.state.notFound) {
			return <NotFound />;
		}

		return <Loading />;
	}
}
