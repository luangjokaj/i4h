import React from 'react';
import classNames from 'classnames';
import './Content.css';

function Content({ children, className }:Props) {
	return (
		<div className={classNames('content', className)}>
			{children}
		</div>
	)
}

export default Content;