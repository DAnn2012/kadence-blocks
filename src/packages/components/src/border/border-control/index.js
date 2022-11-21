/**
 * Border control Component
 *
 */

/**
 * Internal block libraries
 */
 import { useState, useEffect } from '@wordpress/element';
 import { map, isEqual } from 'lodash';
import { __ } from '@wordpress/i18n';
import { UnitControl, DropdownMenu, Flex, FlexItem, Button } from '@wordpress/components';
import { KadenceColorOutput } from '@kadence/helpers'
/**
 * Import Css
 */
 import './editor.scss';
import {
	pxIcon,
	emIcon,
	remIcon,
	vhIcon,
	vwIcon,
	percentIcon,
	outlineTopIcon,
	outlineRightIcon,
	outlineBottomIcon,
	outlineLeftIcon,
	individualIcon,
	linkedIcon,
	topLeftIcon,
	topRightIcon,
	bottomRightIcon,
	bottomLeftIcon,
	radiusLinkedIcon,
	radiusIndividualIcon
} from '@kadence/icons';
import { settings, link, linkOff } from '@wordpress/icons';
import SingleBorderControl from './single-control';
/**
 * Build the Border controls
 * @returns {object} Border Control.
 */
 export default function BorderControl( {
	label,
	onChange,
	onControl,
	value = '',
	className = '',
	help = '',
	defaultValue = {
		top: {
			color: '',
			style: 'solid',
			width: '',
		},
		right: {
			color: '',
			style: 'solid',
			width: '',
		},
		bottom: {
			color: '',
			style: 'solid',
			width: '',
		},
		left: {
			color: '',
			style: 'solid',
			width: '',
		},
		unit: 'px',
	},
	control = 'individual',
	units = [ 'px', 'em', 'rem' ],
	firstIcon = outlineTopIcon,
	secondIcon = outlineRightIcon,
	thirdIcon = outlineBottomIcon,
	fourthIcon = outlineLeftIcon,
	linkIcon = link,
	unlinkIcon = linkOff,
	styles = ['solid', 'dashed', 'dotted', 'double'],
	reset,
} ) {
	const [ theControl, setTheControl ] = useState( control );
	const realControl = onControl ? control : theControl;
	const realSetOnControl = onControl ? onControl : setTheControl;
	const measureIcons = {
		first: firstIcon,
		second: secondIcon,
		third: thirdIcon,
		fourth:  fourthIcon,
		link:  linkIcon,
		unlink: unlinkIcon,
	}
	const currentObject = value?.[0] || defaultValue;
	const step = value.unit !== 'px' ? 0.1 : 1;
	const max = value.unit !== 'px' ? 12 : 200;
	const min = 0;
	const onChangeAll = ( newBorder ) => {
		value.top = newBorder;
		value.bottom = newBorder;
		value.right = newBorder;
		value.left = newBorder;
		const newVal = JSON.parse(JSON.stringify(value));
		onChange( newVal );
	}
	const onChangeSide = ( newBorder, side ) => {
		value[side] = newBorder;
		const newVal = JSON.parse(JSON.stringify(value));
		onChange( newVal );
	}
	const onChangeUnit = ( newUnit ) => {
		value.unit = newUnit;
		const newVal = JSON.parse(JSON.stringify(value));
		onChange( newVal );
	}
	const onReset = () => {
		if ( typeof reset === 'function' ){
			reset();
		} else {
			onChange( [ defaultValue ] );
		}
	}
	return [
		onChange && (
			<div className={ `components-base-control kadence-border-control${ className ? ' ' + className : '' }` }>
				{ label && (
					<div
						className={ 'kadence-border-control__header' }
					>
						{ label && (
							<div className="kadence-border-control__title">
								<label className="components-base-control__label">{ label }</label>
								{ reset && (
									<div className='title-reset-wrap'>
										<Button
											className="is-reset is-single"
											label='reset'
											isSmall
											disabled={ ( ( isEqual( defaultValue, value ) ) ? true : false ) }
											icon={ undo }
											onClick={ () => onReset() }
										/>
									</div>
								) }
							</div>
						) }
						{ realSetOnControl && (
							<Button
								className={'kadence-radio-item border-control-toggle is-single only-icon'}
								label={ realControl !== 'individual' ? __( 'Individual', 'kadence-blocks' ) : __( 'Linked', 'kadence-blocks' )  }
								icon={ realControl !== 'individual' ? measureIcons.link : measureIcons.unlink }
								onClick={ () => realSetOnControl( realControl !== 'individual' ? 'individual' : 'linked' ) }
								isPressed={ realControl !== 'individual' ? true : false }
								isTertiary={ realControl !== 'individual' ? false : true }
							/>
						) }
					</div>
				) }
				<div className={ 'kadence-controls-content' }>
					{ realControl !== 'individual' && (
						<>
							<SingleBorderControl
								value={ ( currentObject?.top || [ '','','', ] ) }
								onChange={ ( newVal ) => onChangeAll( newVal ) }
								min={ min }
								max={ max }
								step={ step }
								help={ help }
								styles={ styles }
								unit={ currentObject?.unit }
								units={ units }
								onUnit={ ( unit ) => onChangeUnit( unit ) }
								defaultValue={ defaultValue.top }
								allowReset={ false }
							/>
						</>
					) }
					{ realControl === 'individual' && (
						<div className={ 'kadence-border-controls-grid-wrap' }>
							<div className={ 'kadence-border-control-grid-visualizer' } style={ {
								borderTopColor: ( currentObject?.top?.[0] ? KadenceColorOutput( currentObject?.top?.[0] ) : undefined ),
								borderTopStyle: currentObject?.top?.[1] || undefined,
								borderTopWidth: ( currentObject?.top?.[2] ? 'clamp( 1px, ' + currentObject?.top?.[2] + currentObject?.unit + ', 10px )' : undefined ),
								borderRightColor: ( currentObject?.right?.[0] ? KadenceColorOutput( currentObject?.right?.[0] ) : undefined ),
								borderRightStyle: currentObject?.right?.[1] || undefined,
								borderRightWidth: ( currentObject?.right?.[2] ? 'clamp( 1px, ' + currentObject?.right?.[2] + currentObject?.unit + ', 10px )' : undefined ),
								borderBottomColor: ( currentObject?.bottom?.[0] ? KadenceColorOutput( currentObject?.bottom?.[0] ) : undefined ),
								borderBottomStyle: currentObject?.bottom?.[1] || undefined,
								borderBottomWidth: ( currentObject?.bottom?.[2] ? 'clamp( 1px, ' + currentObject?.bottom?.[2] + currentObject?.unit + ', 10px )' : undefined ),
								borderLeftColor: ( currentObject?.left?.[0] ? KadenceColorOutput( currentObject?.left?.[0] ) : undefined ),
								borderLeftStyle: currentObject?.left?.[1] || undefined,
								borderLeftWidth: ( currentObject?.left?.[2] ? 'clamp( 1px, ' + currentObject?.left?.[2] + currentObject?.unit + ', 10px )' : undefined ),
							} }></div>
							<SingleBorderControl
								value={ ( currentObject?.top || [ '','','', ] ) }
								onChange={ ( newVal ) => onChangeSide( newVal, 'top' ) }
								min={ min }
								max={ max }
								step={ step }
								help={ help }
								styles={ styles }
								unit={ currentObject?.unit }
								units={ units }
								onUnit={ ( unit ) => onChangeUnit( unit ) }
								defaultValue={ defaultValue.top }
								allowReset={ false }
							/>
							<SingleBorderControl
								value={ ( currentObject?.left || [ '','','', ] ) }
								onChange={ ( newVal ) => onChangeSide( newVal, 'left' ) }
								min={ min }
								max={ max }
								step={ step }
								help={ help }
								styles={ styles }
								unit={ currentObject?.unit }
								units={ units }
								onUnit={ ( unit ) => onChangeUnit( unit ) }
								defaultValue={ defaultValue.left }
								allowReset={ false }
							/>
							<SingleBorderControl
								value={ ( currentObject?.right || [ '','','', ] ) }
								onChange={ ( newVal ) => onChangeSide( newVal, 'right' ) }
								min={ min }
								max={ max }
								step={ step }
								help={ help }
								styles={ styles }
								unit={ currentObject?.unit }
								units={ units }
								onUnit={ ( unit ) => onChangeUnit( unit ) }
								defaultValue={ defaultValue.right }
								allowReset={ false }
							/>
							<SingleBorderControl
								value={ ( currentObject?.bottom || [ '','','', ] ) }
								onChange={ ( newVal ) => onChangeSide( newVal, 'bottom' ) }
								min={ min }
								max={ max }
								step={ step }
								help={ help }
								styles={ styles }
								unit={ currentObject?.unit }
								units={ units }
								onUnit={ ( unit ) => onChangeUnit( unit ) }
								defaultValue={ defaultValue.bottom }
								allowReset={ false }
							/>
						</div>
					) }
				</div>
			</div>
		),
	];
}
