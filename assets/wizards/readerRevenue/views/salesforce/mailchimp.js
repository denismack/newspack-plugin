/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { ExternalLink } from '@wordpress/components';
import { Component, useEffect } from '@wordpress/element';

/**
 * Internal dependencies.
 */
import './style.scss';
import { Notice, CheckboxControl } from '../../../../components/src';

export const MailchimpToggle = props => {
	const { onChange, onMount, settings, webhooks } = props;
	const isConnected = webhooks.length > 0;
	const message = isConnected
		? __( 'Mailchimp newsletter signups are being captured as Salesforce contacts.', 'newspack' )
		: __(
				'Enable this setting to capture Mailchimp newsletter signups as Salesforce contacts.',
				'newspack'
		  );

	// On component mount.
	useEffect( () => onMount(), [] );

	return (
		<CheckboxControl
			checked={ isConnected }
			className="newspack-salesforce-mailchimp"
			disabled={ ! settings.follower_list_id || ! settings.api_key }
			label={ __( 'Sync Mailchimp newsletter signups to Salesforce?', 'newspack' ) }
			onChange={ value => onChange( value, webhooks ) }
			help={
				! settings.follower_list_id || ! settings.api_key ? (
					<ExternalLink href="/wp-admin/admin.php?page=newspack-engagement-wizard#/newsletters">
						{ __(
							'Connect Mailchimp and add a Mailchimp API key to enable this option.',
							'newspack'
						) }
					</ExternalLink>
				) : (
					message
				)
			}
		/>
	);
};
