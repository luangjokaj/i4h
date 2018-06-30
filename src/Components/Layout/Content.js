import React from 'react';
import classNames from 'classnames';

function Content({ children, className }:Props) {
	return (
		<div className={classNames('content', className)}>
			{children}
		</div>
	)
}

export default Content;