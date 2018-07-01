import React from 'react';
import './Grid.css';

function Grid({ children }) {
	return (
		<ul className="grid">
			{children}
		</ul>
	)
}

export default Grid;