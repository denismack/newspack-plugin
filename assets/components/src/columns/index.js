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
		const { className, hasThree, hasFour, marginB, marginT, ...otherProps } = this.props;
		const classes = classnames(
			'newspack-columns',
			hasThree && 'newspack-columns__three',
			hasFour && 'newspack-columns__four',
			className
		);
		const css = {
			marginBottom: marginB,
			marginTop: marginT,
		};
		return <div className={ classes } style={ css } { ...otherProps } />;
	}
}

Columns.defaultProps = {
	marginB: null,
	marginT: null,
};

export default Columns;
