import React from 'react';
import classNames from 'classnames';
import Riangle from '../../assets/svg/Riangle';
import { Helmet } from 'react-helmet';
import './Loading.css';

function Loading({ fixed }) {
	return (
		<div>
			<Helmet>
				<title>Loading...</title>
			</Helmet>
			<div className={classNames('loading', {
				'fixed': fixed
			})}>
				<Riangle />
			</div>
		</div>
	)
}

export default Loading;