import React from 'react';
import classNames from 'classnames';
import { Back, Link, Preview } from '../../assets/svg';
import AppearAfter from '../AppearAfter';

function Button({ onClick, children, className, back, link, preview, delay }) {
	return (
		<AppearAfter className="button" delay={delay}>
			<button className={classNames('button', classNames)} onClick={onClick}>
				{back && <span className="left"><Back /></span>}
				{children}
				{link && <span><Link /></span>}
				{preview && <span><Preview /></span>}
			</button>
		</AppearAfter>
	)
}

export default Button;