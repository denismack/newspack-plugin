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
		const { className, isWide, marginB, marginT, ...otherProps } = this.props;
		const classes = classnames( 'newspack-column', isWide && 'newspack-column__wide', className );
		const css = {
			marginBottom: marginB,
			marginTop: marginT,
		};
		return <div className={ classes } style={ css } { ...otherProps } />;
	}
}

Column.defaultProps = {
	marginB: null,
	marginT: null,
};

export default Column;
