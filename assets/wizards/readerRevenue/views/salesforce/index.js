/**
 * Salesforce Settings Screen
 */

/**
 * External dependencies
 */
import { parse } from 'qs';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { ExternalLink } from '@wordpress/components';
import { Component, Fragment } from '@wordpress/element';

/**
 * Internal dependencies.
 */
import './style.scss';
import { MailchimpToggle } from './mailchimp';
import { Notice, TextControl, withWizardScreen } from '../../../../components/src';

/**
 * Salesforce Settings Screen Component
 */
class Salesforce extends Component {
	constructor() {
		super( ...arguments );
		this.state = {
			error: null,
			mailchimpWebhooks: [],
		};
	}

	/**
	 * On component mount.
	 */
	componentDidMount() {
		const query = parse( window.location.search );
		const authorizationCode = query.code;
		const redirectURI =
			window.location.origin +
			window.location.pathname +
			'?page=' +
			query[ '?page' ] +
			window.location.hash;

		if ( authorizationCode ) {
			// Remove `code` param from URL without adding history.
			window.history.replaceState( {}, '', redirectURI );

			this.getTokens( authorizationCode, redirectURI );
		}
	}

	/**
	 * On component update.
	 */
	componentDidUpdate( prevProps ) {
		const { isConnected } = this.props;

		// Clear any state errors on reset.
		if ( prevProps.isConnected && ! isConnected ) {
			return this.setState( { error: null } );
		}

		// If we're already connected, check status of refresh token.
		if ( ! prevProps.isConnected && isConnected ) {
			return this.checkToken();
		}
	}

	/**
	 * Use auth code to request access and refresh tokens for Salesforce API.
	 * Saves tokens to options table.
	 * https://help.salesforce.com/articleView?id=remoteaccess_oauth_web_server_flow.htm&type=5
	 *
	 * @param {string} authorizationCode Auth code fetched from Salesforce.
	 * @return {void}
	 */
	async getTokens( authorizationCode, redirectURI ) {
		const { data, onChange, wizardApiFetch } = this.props;
		const { mailchimp_settings } = data;

		console.log( mailchimp_settings );

		try {
			// Get the tokens.
			const response = await wizardApiFetch( {
				path: '/newspack/v1/wizard/salesforce/tokens',
				method: 'POST',
				data: {
					code: authorizationCode,
					redirect_uri: redirectURI,
				},
			} );

			const { access_token, client_id, client_secret, instance_url, refresh_token } = response;

			// Update values in parent state.
			if ( access_token && refresh_token ) {
				return onChange( {
					...data,
					access_token,
					client_id,
					client_secret,
					instance_url,
					refresh_token,
					mailchimp_settings,
				} );
			}
		} catch ( e ) {
			console.error( e );
			this.setState( {
				error: __(
					'We couldn’t establish a connection to Salesforce. Please verify your Consumer Key and Secret and try connecting again.',
					'newspack'
				),
			} );
		}
	}

	/**
	 * Check validity of refresh token and show an error message if it's no longer active.
	 * The refresh token is valid until it's manually revoked in the Salesforce dashboard,
	 * or the Connected App is deleted there.
	 */
	async checkToken() {
		const { wizardApiFetch } = this.props;
		const error = __(
			'We couldn’t validate the connection with Salesforce. Please verify the status of the Connected App in Salesforce.',
			'newspack'
		);

		try {
			const response = await wizardApiFetch( {
				path: '/newspack/v1/wizard/salesforce/introspect',
				method: 'POST',
			} );

			if ( true !== response.active ) {
				this.setState( { error } );
			}
		} catch ( e ) {
			console.error( e );
			this.setState( { error } );
		}
	}

	/**
	 * Check for the existence of a Mailchimp webhook to sync to Salesforce.
	 */
	async checkMailchimpWebhooks() {
		const { data, wizardApiFetch } = this.props;
		const { mailchimp_settings } = data;
		const error = __( 'We couldn’t validate the connection with Mailchimp.', 'newspack' );

		if ( ! mailchimp_settings || ! mailchimp_settings.api_key ) {
			return;
		}

		try {
			const response = await wizardApiFetch( {
				path: '/newspack/v1/wizard/salesforce/mailchimp',
				method: 'GET',
			} );

			if ( response.webhooks ) {
				this.setState( { mailchimpWebhooks: response.webhooks } );
			}
		} catch ( e ) {
			console.error( e );
			this.setState( { error } );
		}
	}

	/**
	 * Create a Mailchimp webhook to sync subscribers to Salesforce upon signup, or delete the existing one.
	 *
	 * @param boolean create   Whether Mailchimp signups should be synced to Salesforce contacts.
	 * @param array   webhooks Array of webhooks to update.
	 */
	async updateMailchimpWebhook( create, webhooks = [] ) {
		const { wizardApiFetch } = this.props;
		const error = __( 'We couldn’t validate the connection with Mailchimp.', 'newspack' );

		try {
			const response = await wizardApiFetch( {
				path: '/newspack/v1/wizard/salesforce/mailchimp',
				method: 'POST',
				data: { create, webhooks },
			} );

			this.checkMailchimpWebhooks();
		} catch ( e ) {
			console.error( e );
			this.setState( { error } );
		}
	}

	/**
	 * Render.
	 */
	render() {
		const { data, isConnected, onChange } = this.props;
		const { mailchimpWebhooks } = this.state;
		const { client_id, client_secret, mailchimp_settings, error } = data;

		return (
			<div className="newspack-salesforce-wizard">
				<Fragment>
					<h2>{ __( 'Connected App settings', 'newspack' ) }</h2>

					{ this.state.error && <Notice noticeText={ this.state.error } isWarning /> }

					{ isConnected && ! this.state.error && (
						<Notice
							noticeText={ __( 'Your site is connected to Salesforce.', 'newspack' ) }
							isSuccess
						/>
					) }

					{ ! isConnected && ! this.state.error && (
						<Fragment>
							<p>
								{ __(
									'To connect with Salesforce, create or choose a Connected App for this site in your Salesforce dashboard. Make sure to paste the the full URL for this page into the “Callback URL” field in the Connected App’s settings. ',
									'newspack'
								) }
								<ExternalLink href="https://help.salesforce.com/articleView?id=connected_app_create.htm">
									{ __( 'Learn how to create a Connected App', 'newspack' ) }
								</ExternalLink>
							</p>

							<p>
								{ __(
									'Enter your Consumer Key and Secret below, then click “Connect” to authorize access to your Salesforce account.',
									'newspack'
								) }
							</p>
						</Fragment>
					) }

					{ isConnected && (
						<p>
							{ __(
								'To reconnect your site in case of issues, or to connect to a different Salesforce account, click “Reset" below. You will need to re-enter your Consumer Key and Secret before you can re-connect to Salesforce.',
								'newspack'
							) }
						</p>
					) }

					{ error && (
						<Notice
							noticeText={ __(
								'We couldn’t connect to Salesforce. Please verify that you entered the correct Consumer Key and Secret and try again. If you just created your Connected App or edited the Callback URL settings, it may take up to an hour before we can establish a connection.',
								'newspack'
							) }
							isWarning
						/>
					) }

					<TextControl
						disabled={ isConnected }
						label={
							( isConnected ? __( 'Your', 'newspack' ) : __( 'Enter your', 'newspack' ) ) +
							__( ' Salesforce Consumer Key', 'newspack' )
						}
						value={ client_id }
						onChange={ value => {
							if ( isConnected ) {
								return;
							}
							onChange( { ...data, client_id: value } );
						} }
					/>
					<TextControl
						disabled={ isConnected }
						label={
							( isConnected ? __( 'Your', 'newspack' ) : __( 'Enter your', 'newspack' ) ) +
							__( ' Salesforce Consumer Secret', 'newspack' )
						}
						value={ client_secret }
						onChange={ value => {
							if ( isConnected ) {
								return;
							}
							onChange( { ...data, client_secret: value } );
						} }
					/>

					{ isConnected && mailchimp_settings && (
						<MailchimpToggle
							onMount={ this.checkMailchimpWebhooks.bind( this ) }
							onChange={ this.updateMailchimpWebhook.bind( this ) }
							settings={ mailchimp_settings }
							webhooks={ mailchimpWebhooks.filter(
								webhook => webhook.url.indexOf( '/salesforce/mailchimp/sync' ) > -1
							) }
						/>
					) }
				</Fragment>
			</div>
		);
	}
}

Salesforce.defaultProps = {
	data: {},
	onChange: () => null,
};

export default withWizardScreen( Salesforce );
