import React from 'react';
import Riangle from '../../assets/svg/Riangle';
import { Helmet } from 'react-helmet';

function Loading() {
	return (
		<div>
			<Helmet>
				<title>Loading...</title>
				<meta name="description" content="Helmet application" />
			</Helmet>
			<div className="loading">
				<Riangle />
			</div>
		</div>
	)
}

export default Loading;