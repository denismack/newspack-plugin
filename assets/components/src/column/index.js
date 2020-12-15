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
		const { className, isWide, ...otherProps } = this.props;
		const classes = classnames( 'newspack-column', isWide && 'newspack-column__wide', className );
		const styles = {
			marginBottom: this.props.marginBottom,
			marginTop: this.props.marginTop,
		};
		return <div className={ classes } style={ styles } { ...otherProps } />;
	}
}

Column.defaultProps = {
	marginBottom: null,
	marginTop: null,
};

export default Column;
