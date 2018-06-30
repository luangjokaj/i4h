import React, { Component } from 'react';
import Loading from '../../Components/Layout/Loading';
import PrismicReact from 'prismic-reactjs';
import { Behance, Dribbble, Twitter, Link } from '../../assets/svg';
import AppearAfter from '../AppearAfter';

class Designers extends Component {
	state = {
		doc: null,
		notFound: false,
	};

	componentWillMount() {
		this.fetchDesigners(this.props);
	}

	componentWillUnmount() {
		this.setState({
			doc: null,
			notFound: false,
		});
	}

	fetchDesigners(props) {
		if (props.prismicCtx) {
			return props.prismicCtx.api.getByUID('designers', props.authorUID, {}, (err, doc) => {
				if (doc) {
					this.setState({ doc });
					console.log(this.state);
				} else {
					this.setState({ notFound: !doc })
				}
			});
		}

		return null;
	}

	render() {
		const { doc } = this.state;
		if (doc) {
			return (
				<AppearAfter className="designer" delay={500}>
					<div>
						<div className="designer-content">
							<img src={doc.data.image.url} alt={PrismicReact.RichText.asText(doc.data.designer_name)}/>
							<div className="inner">
								<div className="name">
									{PrismicReact.RichText.asText(doc.data.designer_name)}
								{doc.data.portfolio.url && <a href={doc.data.portfolio.url} target="_blank"><Link /> Portfolio</a>}
								</div>
								<div className="socials">
									{doc.data.behance.url && <a href={doc.data.behance.url} target="_blank"><Behance /></a>}
									{doc.data.dribbble.url && <a href={doc.data.dribbble.url} target="_blank"><Dribbble /></a>}
									{doc.data.twitter.url && <a href={doc.data.twitter.url} target="_blank"><Twitter /></a>}
								</div>
							</div>
						</div>
					</div>
				</AppearAfter>
			)
		} else if (this.state.notFound) {
			return <Loading />;
		}
		return <Loading />;
	}
}

export default Designers;