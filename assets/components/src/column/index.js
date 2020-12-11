/**
 * Column
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

class Column extends Component {
	/**
	 * Render
	 */
	render() {
		const { className, isWide, negativeMargin, ...otherProps } = this.props;
		const classes = classnames(
			'newspack-column',
			isWide && 'newspack-column__wide',
			negativeMargin && 'newspack-column__negative-margin',
			className
		);
		return <div className={ classes } { ...otherProps } />;
	}
}

export default Column;
