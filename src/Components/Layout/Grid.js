import React from 'react';

function Grid({ children }:Props) {
	return (
		<ul className="grid">
			{children}
		</ul>
	)
}

export default Grid;