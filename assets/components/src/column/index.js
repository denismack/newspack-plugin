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
		const { className, marginBottom, marginTop, ...otherProps } = this.props;
		const classes = classnames( 'newspack-column', className );
		const styles = {
			'margin-bottom': marginBottom,
			'margin-top': marginTop,
		};
		return <div className={ classes } style={ styles } { ...otherProps } />;
	}
}

Column.defaultProps = {
	marginBottom: null,
	marginTop: null,
};

export default Column;
