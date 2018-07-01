import React from 'react';
import classNames from 'classnames';
import PrismicReact from 'prismic-reactjs';
import NotFound from '../NotFound';
import { Helmet } from 'react-helmet';
import { Loading, Content, Button } from '../../Components/Layout';
import { Link, Preview } from '../../assets/svg';
import AppearAfter from '../../Components/AppearAfter';
import Designers from '../../Components/Designers';
import ReactGA from 'react-ga';
import './Detail.css';

ReactGA.initialize('UA-120213712-1')

export default class Page extends React.Component {
	state = {
		doc: null,
		notFound: false,
	};

	componentWillMount() {
		this.fetchPage(this.props);
		ReactGA.ga('send', 'pageview', `/shots/${this.props.match.params.category}/${this.props.match.params.uid}`);
	}

	componentWillReceiveProps(props) {
		this.fetchPage(props);
	}

	fetchPage(props) {
		if (props.prismicCtx) {
			return props.prismicCtx.api.getByUID(props.match.params.category, props.match.params.uid, {}, (err, doc) => {
				if (doc) {
					this.setState({ doc });
					console.log(this.state);
				} else {
					this.setState({ notFound: !doc });
				}
			});
		}
		return null;
	}

	render() {
		const { doc } = this.state;
		const { history } = this.props;

		if (doc) {
			return (
				<div className="page-wrapper">
					<Helmet>
						<title>{doc.data.title && PrismicReact.RichText.asText(doc.data.title)} • Interfaces 4 Humans</title>
					</Helmet>
					<AppearAfter data-wio-id={doc.id} className="view" delay={500}>
						<Content>
							<main className={classNames({
								'push-bottom': doc.data.author.uid
							})}>
								<div className="tools">
									<Button onClick={history.goBack} back delay={700}> Back</Button>
									<div>
										{doc.data.livelink.url && <AppearAfter delay={800} className="button"><a href={doc.data.livelink.url} target="_blank" className="button">
											Live
											<span><Preview /></span>
										</a></AppearAfter>}
										{doc.data.sourcelink.url && <AppearAfter delay={900} className="button"><a href={doc.data.sourcelink.url} target="_blank" className="button">
											Source
											<span><Link /></span>
										</a></AppearAfter>}
									</div>
								</div>
								{!doc.data.animation.url && <img alt="cover" src={doc.data.image.url} />}
								{doc.data.animation.url && <img alt="cover" src={doc.data.animation.url} />}
							</main>
							{doc.data.author.uid && <Designers authorUID={doc.data.author.uid} prismicCtx={this.props.prismicCtx} />}
						</Content>
					</AppearAfter>
				</div>
			);
		} else if (this.state.notFound) {
			return <NotFound />;
		}
		return <Loading />;
	}
}
