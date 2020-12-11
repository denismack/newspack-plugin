/**
 * Columns
 */

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';

/**
 * Internal dependencies
 */
import './style.scss';

/**
 * External dependencies
 */
import classnames from 'classnames';

class Columns extends Component {
	/**
	 * Render
	 */
	render() {
		const { className, hasThree, hasFour, ...otherProps } = this.props;
		const classes = classnames(
			'newspack-columns',
			hasThree && 'newspack-columns__three',
			hasFour && 'newspack-columns__four',
			className
		);
		return <div className={ classes } { ...otherProps } />;
	}
}

export default Columns;
