import React from 'react';
import { Helmet } from 'react-helmet';
import AppearAfter from '../../Components/AppearAfter';
import { Alien } from '../../assets/svg';

function NotFound() {
	return (
		<div className="not-found">
			<Helmet>
				<title>404 Not Found • Interfaces 4 Humans</title>
				<meta name="description" content="Page not found - Interfaces for Humans" />
			</Helmet>
			<AppearAfter className="inner" delay={500}>
				<div>
					<Alien />
					<h1>Page not found!</h1>
					<p>The request page does not exist.</p>
				</div>
			</AppearAfter>
		</div>
	)
}

export default NotFound;