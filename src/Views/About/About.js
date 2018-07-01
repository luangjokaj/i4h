import React, { Component } from 'react';
import classNames from 'classnames';
import { Helmet } from 'react-helmet';
import AppearAfter from '../../Components/AppearAfter';
import { Loading, Content, Button } from '../../Components/Layout';
import Designers from '../../Components/Designers';
import { GitHub } from '../../assets/svg';
import './About.css';

class About extends Component {
	render() {
		return (
			<div className="page-wrapper">
				<Helmet>
					<title>About • Interfaces 4 Humans</title>
				</Helmet>
				<AppearAfter className="view" delay={500}>
					<Content>
						<main className="push-bottom">
							<div className="tools">
								<Button onClick={history.goBack} back delay={700}>
									{' '}
									Back
								</Button>
								<div />
							</div>
							<div className="aboutPage">
								<p>
									Hello my name is{' '}
									<a href="https://www.riangle.com/" target="_blank">
										Luan
									</a>, I built Interfaces4Humans because I wanted to sort, list and be able to
									search through the design and interactions I collected over the years.
								</p>

								<p>
									At the same time I wanted to challange myself to learn the latest front-end
									development ecosystems. This project is build on{' '}
									<a href="https://reactjs.org/" target="_blank">
										React
									</a>{' '}
									and it renders on the client. The backend is powered by{' '}
									<a target="https://prismic.io/dashboard/" target="_blank">
										Prismic
									</a>, a fantastic minimalistic headless cms. It is build with{' '}
									<a href="https://parceljs.org/" target="_blank">
										Parcel
									</a>{' '}
									and deployed on{' '}
									<a href="https://heroku.com/" target="_blank">
										Heroku
									</a>.
								</p>

								<p>
									The project will be kept up to date and new features will be added along the way.
									Check out the code and help out with suggestions or contributions.
								</p>

								<a href="https://github.com/luangjokaj/i4h" target="_blank" className="github">
									<GitHub /> <span>GitHub</span>
								</a>
							</div>
						</main>
						<Designers authorUID="luan" prismicCtx={this.props.prismicCtx} />
					</Content>
				</AppearAfter>
			</div>
		);
	}
}

export default About;
