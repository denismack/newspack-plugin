/**
 * Stripe Setup Screen
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { ExternalLink } from '@wordpress/components';

/**
 * Internal dependencies
 */
import {
	CheckboxControl,
	Column,
	Columns,
	TextControl,
	ToggleControl,
	withWizardScreen,
} from '../../../../components/src';

/**
 * Stripe Setup Screen Component
 */
class StripeSetup extends Component {
	/**
	 * Render.
	 */
	render() {
		const { data, onChange } = this.props;
		const {
			enabled = false,
			testMode = false,
			publishableKey = '',
			secretKey = '',
			testPublishableKey = '',
			testSecretKey = '',
		} = data;
		return (
			<Columns>
				<Column>
					<ToggleControl
						label={ __( 'Enable Stripe' ) }
						checked={ enabled }
						onChange={ _enabled => onChange( { ...data, enabled: _enabled } ) }
					/>
					{ ! enabled && (
						<p>
							{ __( 'Other gateways can be enabled and set up in the ' ) }
							<ExternalLink href="/wp-admin/admin.php?page=wc-settings&tab=checkout">
								{ __( 'WooCommerce payment gateway settings' ) }
							</ExternalLink>
						</p>
					) }
					{ enabled && (
						<p>
							{ __( 'Get your API keys from your Stripe account.' ) }{' '}
							<ExternalLink href="https://stripe.com/docs/keys#api-keys">
								{ __( 'Learn how' ) }
							</ExternalLink>
						</p>
					) }
				</Column>
				{ enabled && (
					<Column>
						<CheckboxControl
							label={ __( 'Use Stripe in test mode' ) }
							checked={ testMode }
							onChange={ _testMode => onChange( { ...data, testMode: _testMode } ) }
							tooltip="Test mode will not capture real payments. Use it for testing your purchase flow."
						/>
						{ testMode && (
							<Fragment>
								<TextControl
									type="password"
									value={ testPublishableKey }
									label={ __( 'Test Publishable Key' ) }
									onChange={ _testPublishableKey =>
										onChange( { ...data, testPublishableKey: _testPublishableKey } )
									}
								/>
								<TextControl
									type="password"
									value={ testSecretKey }
									label={ __( 'Test Secret Key' ) }
									onChange={ _testSecretKey =>
										onChange( { ...data, testSecretKey: _testSecretKey } )
									}
								/>
							</Fragment>
						) }
						{ ! testMode && (
							<Fragment>
								<TextControl
									type="password"
									value={ publishableKey }
									label={ __( 'Publishable Key' ) }
									onChange={ _publishableKey =>
										onChange( { ...data, publishableKey: _publishableKey } )
									}
								/>
								<TextControl
									type="password"
									value={ secretKey }
									label={ __( 'Secret Key' ) }
									onChange={ _secretKey => onChange( { ...data, secretKey: _secretKey } ) }
								/>
							</Fragment>
						) }
					</Column>
				) }
			</Columns>
		);
	}
}

StripeSetup.defaultProps = {
	data: {},
	onChange: () => null,
};

export default withWizardScreen( StripeSetup );
