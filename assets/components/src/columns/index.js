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
		const { className, columns3, columns4, gutterMedium, gutterSmall, ...otherProps } = this.props;
		const classes = classnames(
			'newspack-columns',
			columns3 && 'newspack-columns__columns-3',
			columns4 && 'newspack-columns__columns-4',
			gutterMedium && 'newspack-columns__gutter-medium',
			gutterSmall && 'newspack-columns__gutter-small',
			className
		);
		return <div className={ classes } { ...otherProps } />;
	}
}

export default Columns;
