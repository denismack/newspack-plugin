/**
 * News Revenue Hub Settings Screen
 */

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { Column, Columns, TextControl, withWizardScreen } from '../../../../components/src';

/**
 * News Revenue Hub Settings Screen Component
 */
class NRHSettings extends Component {
	/**
	 * Render.
	 */
	render() {
		const { data, onChange } = this.props;
		const { nrh_organization_id, nrh_salesforce_campaign_id } = data;
		return (
			<Columns>
				<Column>
					<TextControl
						label={ __( 'NRH Organization ID', 'newspack' ) }
						value={ nrh_organization_id || '' }
						onChange={ _nrh_organization_id =>
							onChange( { ...data, nrh_organization_id: _nrh_organization_id } )
						}
					/>
				</Column>
				<Column>
					<TextControl
						label={ __( 'NRH Salesforce Campaign ID', 'newspack' ) }
						value={ nrh_salesforce_campaign_id || '' }
						onChange={ _nrh_salesforce_campaign_id =>
							onChange( {
								...data,
								nrh_salesforce_campaign_id: _nrh_salesforce_campaign_id,
							} )
						}
					/>
				</Column>
			</Columns>
		);
	}
}

export default withWizardScreen( NRHSettings );
