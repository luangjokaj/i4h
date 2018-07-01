import React from 'react';
import { Link } from 'react-router-dom';
import AppearAfter from '../AppearAfter';
import Gif from '../../assets/svg/Gif';
import './Tile.css';

function Tile({ image, alt, url, type, animation }: Props) {
	const href = '/' + url;
	return (
		<AppearAfter className="tile">
			<li>
				<Link
					to={type === 'designers' ? '/designers' + href : { pathname: '/shots/' + type + href }}
				>
					{animation && <Gif className="gif" />}
					<div
						className="image"
						style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' }}
					>
						{animation && (
							<div
								className="animated-image"
								style={{ backgroundImage: `url(${animation})`, backgroundSize: 'cover' }}
							/>
						)}
					</div>
					{alt}
				</Link>
			</li>
		</AppearAfter>
	);
}

export default Tile;
