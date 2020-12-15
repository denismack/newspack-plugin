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
			<Fragment>
				<ToggleControl
					label={ __( 'Enable Stripe' ) }
					checked={ enabled }
					onChange={ _enabled => onChange( { ...data, enabled: _enabled } ) }
				/>
				{ ! enabled && (
					<Columns>
						<Column>
							<p>
								{ __( 'Other gateways can be enabled and set up in the ' ) }
								<ExternalLink href="/wp-admin/admin.php?page=wc-settings&tab=checkout">
									{ __( 'WooCommerce payment gateway settings' ) }
								</ExternalLink>
							</p>
						</Column>
					</Columns>
				) }
				{ enabled && (
					<Fragment>
						<Columns>
							<Column>
								<CheckboxControl
									label={ __( 'Use Stripe in test mode' ) }
									checked={ testMode }
									onChange={ _testMode => onChange( { ...data, testMode: _testMode } ) }
									tooltip="Test mode will not capture real payments. Use it for testing your purchase flow."
								/>
								<p>
									{ __( 'Get your API keys from your Stripe account.' ) }{' '}
									<ExternalLink href="https://stripe.com/docs/keys#api-keys">
										{ __( 'Learn how' ) }
									</ExternalLink>
								</p>
							</Column>
						</Columns>
						<Columns marginTop={ 32 }>
							{ testMode && (
								<Fragment>
									<Column isWide>
										<TextControl
											type="password"
											value={ testPublishableKey }
											label={ __( 'Test Publishable Key' ) }
											onChange={ _testPublishableKey =>
												onChange( { ...data, testPublishableKey: _testPublishableKey } )
											}
										/>
									</Column>
									<Column isWide>
										<TextControl
											type="password"
											value={ testSecretKey }
											label={ __( 'Test Secret Key' ) }
											onChange={ _testSecretKey =>
												onChange( { ...data, testSecretKey: _testSecretKey } )
											}
										/>
									</Column>
								</Fragment>
							) }
							{ ! testMode && (
								<Fragment>
									<Column isWide>
										<TextControl
											type="password"
											value={ publishableKey }
											label={ __( 'Publishable Key' ) }
											onChange={ _publishableKey =>
												onChange( { ...data, publishableKey: _publishableKey } )
											}
										/>
									</Column>
									<Column isWide>
										<TextControl
											type="password"
											value={ secretKey }
											label={ __( 'Secret Key' ) }
											onChange={ _secretKey => onChange( { ...data, secretKey: _secretKey } ) }
										/>
									</Column>
								</Fragment>
							) }
						</Columns>
					</Fragment>
				) }
			</Fragment>
		);
	}
}

StripeSetup.defaultProps = {
	data: {},
	onChange: () => null,
};

export default withWizardScreen( StripeSetup );
