import React, { Component } from 'react';
import classNames from 'classnames';
import AppearAfter from '../AppearAfter';
import Name from '../../assets/svg/Name';
import { Pictogram, Search, External } from '../../assets/svg';
import { Link, NavLink, withRouter } from 'react-router-dom';
import './Navigation.css';

class Navigation extends Component {
	constructor(props) {
		super(props);

		this.state = {
			menu: false,
			text: '',
		};
	}

	toggleMenu = () => {
		this.setState({ menu: !this.state.menu });
	};

	closeMenu = () => {
		this.setState({ menu: false });
	};

	onChange = event => {
		this.setState({ text: event.target.value });
	};

	onSubmit = event => {
		event.preventDefault();
		this.closeMenu();
		this.props.history.push(`/search/${this.state.text}`);
		document.getElementById('search').blur();
	};

	render() {
		const { menu, text } = this.state;

		return (
			<AppearAfter className="header" delay={500}>
				<header>
					<Name className="name" />
					<NavLink to="/" exact className="logo" onClick={this.closeMenu}>
						<Pictogram />
					</NavLink>
					<button
						onClick={this.toggleMenu}
						className={classNames('burger', {
							active: menu,
						})}
					>
						<span />
					</button>

					<ul
						className={classNames('menu', {
							active: menu,
						})}
					>
						<ul className="extra">
							<li>
								<NavLink to="/about" activeClassName="active" onClick={this.toggleMenu}>About</NavLink>
							</li>
							<li>
								<a href="https://www.riangle.com/" target="_blank" onClick={this.toggleMenu}>Riangle <External /></a>
							</li>
						</ul>
						<li>
							<NavLink to="/web" activeClassName="active" onClick={this.toggleMenu}>
								Web
							</NavLink>
						</li>
						<li>
							<NavLink to="/app" activeClassName="active" onClick={this.toggleMenu}>
								App
							</NavLink>
						</li>
						<li>
							<NavLink to="/portfolio" activeClassName="active" onClick={this.toggleMenu}>
								Portfolio
							</NavLink>
						</li>
						<li>
							<NavLink to="/animation" activeClassName="active" onClick={this.toggleMenu}>
								Animation
							</NavLink>
						</li>
						<li className="search">
							<form onSubmit={this.onSubmit}>
								<input id="search" type="text" onChange={this.onChange} placeholder="Search..." />
								<Link to={`/search/${text}`} className="search-button" onClick={this.closeMenu}>
									<Search />
								</Link>
							</form>
						</li>
					</ul>
				</header>
			</AppearAfter>
		);
	}
}

export default withRouter(Navigation);
