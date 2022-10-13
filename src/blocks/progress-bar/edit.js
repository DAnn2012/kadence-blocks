/**
 * BLOCK: Kadence Block Template
 */

/**
 * Import Css
 */
import './editor.scss';

import {
	TypographyControls,
	PopColorControl,
	WebfontLoader,
	ResponsiveRangeControls,
	ResponsiveMeasurementControls,
	ResponsiveAlignControls
} from '@kadence/components';

import {
	KadenceColorOutput,
	getPreviewSize
} from '@kadence/helpers';

import {
	progressIcon,
	lineBar,
	circleBar,
	semiCircleBar
} from '@kadence/icons'
 /**
 * Internal block libraries
 */
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import {
	useState,
	useEffect,
	useCallback,
	useMemo,
	Fragment
} from '@wordpress/element';
import { useBlockProps, BlockAlignmentControl } from '@wordpress/block-editor';
import { map } from 'lodash';
import {
	RichText,
	AlignmentToolbar,
	InspectorControls,
	BlockControls,
} from '@wordpress/block-editor';

import {
	PanelBody,
	SelectControl,
	ButtonGroup,
	Button,
	ToggleControl
} from '@wordpress/components';
import {
	Circle,
	SemiCircle,
	Line
} from 'progressbar.js'
/**
 * Internal dependencies
 */
import classnames from 'classnames';
const ktUniqueIDs = [];

export function Edit( {
	attributes,
	setAttributes,
	className,
	clientId,
} ) {

	const {
		uniqueID,
		align,
		paddingTablet,
		paddingDesktop,
		paddingMobile,
		paddingUnit,
		marginTablet,
		marginDesktop,
		marginMobile,
		marginUnit,
		barBackground,
		barBackgroundOpacity,
		containerBorder,
		containerTabletBorder,
		containerMobileBorder,
		containerBorderType,
		borderColor,
		borderOpacity,
		barType,
		containerMaxWidth,
		tabletContainerMaxWidth,
		mobileContainerMaxWidth,
		containerMaxWidthUnits,
		displayLabel,
		labelFont,
		labelMinHeight,
		label,
		labelAlign,
		labelPosition

	} = attributes;

	useEffect( () => {
		if ( !uniqueID ) {
			const blockConfigObject = ( kadence_blocks_params.configuration ? JSON.parse( kadence_blocks_params.configuration ) : [] );
			if ( blockConfigObject[ 'kadence/block-template' ] !== undefined && typeof blockConfigObject[ 'kadence/block-template' ] === 'object' ) {
				Object.keys( blockConfigObject[ 'kadence/block-template' ] ).map( ( attribute ) => {
					uniqueID = blockConfigObject[ 'kadence/block-template' ][ attribute ];
				} );
			}
			setAttributes( {
				uniqueID: '_' + clientId.substr( 2, 9 ),
			} );
			ktUniqueIDs.push( '_' + clientId.substr( 2, 9 ) );
		} else if ( ktUniqueIDs.includes( uniqueID ) ) {
			setAttributes( {
				uniqueID: '_' + clientId.substr( 2, 9 ),
			} );
			ktUniqueIDs.push( '_' + clientId.substr( 2, 9 ) );
		} else {
			ktUniqueIDs.push( uniqueID );
		}
	}, [] );

	const { isUniqueID, isUniqueBlock, previewDevice } = useSelect(
		( select ) => {
			return {
				isUniqueID: ( value ) => select( 'kadenceblocks/data' ).isUniqueID( value ),
				isUniqueBlock: ( value, clientId ) => select( 'kadenceblocks/data' ).isUniqueBlock( value, clientId ),
				previewDevice: select( 'kadenceblocks/data' ).getPreviewDeviceType(),
			};
		},
		[ clientId ]
	);

	/*These const are for the responsive settings, so that we give the correct rpview based on the display type*/
	const previewMarginTop = getPreviewSize( previewDevice, ( undefined !== marginDesktop ? marginDesktop[0] : '' ), ( undefined !== marginTablet ? marginTablet[ 0 ] : '' ), ( undefined !== marginMobile ? marginMobile[ 0 ] : '' ) );
	const previewMarginRight = getPreviewSize( previewDevice, ( undefined !== marginDesktop ? marginDesktop[1] : '' ), ( undefined !== marginTablet ? marginTablet[ 1 ] : '' ), ( undefined !== marginMobile ? marginMobile[ 1 ] : '' ) );
	const previewMarginBottom = getPreviewSize( previewDevice, ( undefined !== marginDesktop ? marginDesktop[2] : '' ), ( undefined !== marginTablet ? marginTablet[ 2 ] : '' ), ( undefined !== marginMobile ? marginMobile[ 2 ] : '' ) );
	const previewMarginLeft = getPreviewSize( previewDevice, ( undefined !== marginDesktop ? marginDesktop[3] : '' ), ( undefined !== marginTablet ? marginTablet[ 3 ] : '' ), ( undefined !== marginMobile ? marginMobile[ 3 ] : '' ) );

	const previewPaddingTop = getPreviewSize( previewDevice, ( undefined !== paddingDesktop ? paddingDesktop[0] : '' ), ( undefined !== paddingTablet ? paddingTablet[ 0 ] : '' ), ( undefined !== paddingMobile ? paddingMobile[ 0 ] : '' ) );
	const previewPaddingRight = getPreviewSize( previewDevice, ( undefined !== paddingDesktop ? paddingDesktop[1] : '' ), ( undefined !== paddingTablet ? paddingTablet[ 1 ] : '' ), ( undefined !== paddingMobile ? paddingMobile[ 1 ] : '' ) );
	const previewPaddingBottom = getPreviewSize( previewDevice, ( undefined !== paddingDesktop ? paddingDesktop[2] : '' ), ( undefined !== paddingTablet ? paddingTablet[ 2 ] : '' ), ( undefined !== paddingMobile ? paddingMobile[ 2 ] : '' ) );
	const previewPaddingLeft = getPreviewSize( previewDevice, ( undefined !== paddingDesktop ? paddingDesktop[3] : '' ), ( undefined !== paddingTablet ? paddingTablet[ 3 ] : '' ), ( undefined !== paddingMobile ? paddingMobile[ 3 ] : '' ) );

	const previewBarBorderTop = getPreviewSize( previewDevice, ( undefined !== containerBorder && undefined !== containerBorder[ 0 ] ? containerBorder[ 0 ] : '' ), ( undefined !== containerTabletBorder && undefined !== containerTabletBorder[ 0 ] ? containerTabletBorder[ 0 ] : '' ), ( undefined !== containerMobileBorder && undefined !== containerMobileBorder[ 0 ] ? containerMobileBorder[ 0 ] : '' ) );
	const previewBarBorderRight = getPreviewSize( previewDevice, ( undefined !== containerBorder && undefined !== containerBorder[ 1 ] ? containerBorder[ 1 ] : '' ), ( undefined !== containerTabletBorder && undefined !== containerTabletBorder[ 1 ] ? containerTabletBorder[ 1 ] : '' ), ( undefined !== containerMobileBorder && undefined !== containerMobileBorder[ 1 ] ? containerMobileBorder[ 1 ] : '' ) );
	const previewBarBorderBottom = getPreviewSize( previewDevice, ( undefined !== containerBorder && undefined !== containerBorder[ 2 ] ? containerBorder[ 2 ] : '' ), ( undefined !== containerTabletBorder && undefined !== containerTabletBorder[ 2 ] ? containerTabletBorder[ 2 ] : '' ), ( undefined !== containerMobileBorder && undefined !== containerMobileBorder[ 2 ] ? containerMobileBorder[ 2 ] : '' ) );
	const previewBarBorderLeft = getPreviewSize( previewDevice, ( undefined !== containerBorder && undefined !== containerBorder[ 3 ] ? containerBorder[ 3 ] : '' ), ( undefined !== containerTabletBorder && undefined !== containerTabletBorder[ 3 ] ? containerTabletBorder[ 3 ] : '' ), ( undefined !== containerMobileBorder && undefined !== containerMobileBorder[ 3 ] ? containerMobileBorder[ 3 ] : '' ) );

	const previewContainerMaxWidth = getPreviewSize( previewDevice, ( undefined !== containerMaxWidth ? containerMaxWidth : '' ), ( undefined !== tabletContainerMaxWidth ? tabletContainerMaxWidth : '' ), ( undefined !== mobileContainerMaxWidth ? mobileContainerMaxWidth : '' ) );

	const previewLabelFont = getPreviewSize( previewDevice, ( undefined !== labelFont.size && undefined !== labelFont.size[ 0 ] && '' !== labelFont.size[ 0 ] ? labelFont.size[ 0 ] : '' ), ( undefined !== labelFont.size && undefined !== labelFont.size[ 1 ] && '' !== labelFont.size[ 1 ] ? labelFont.size[ 1 ] : '' ), ( undefined !== labelFont.size && undefined !== labelFont.size[ 2 ] && '' !== labelFont.size[ 2 ] ? labelFont.size[ 2 ] : '' ) );
	const previewLabelLineHeight = getPreviewSize( previewDevice, ( undefined !== labelFont.lineHeight && undefined !== labelFont.lineHeight[ 0 ] && '' !== labelFont.lineHeight[ 0 ] ? labelFont.lineHeight[ 0 ] : '' ), ( undefined !== labelFont.lineHeight && undefined !== labelFont.lineHeight[ 1 ] && '' !== labelFont.lineHeight[ 1 ] ? labelFont.lineHeight[ 1 ] : '' ), ( undefined !== labelFont.lineHeight && undefined !== labelFont.lineHeight[ 2 ] && '' !== labelFont.lineHeight[ 2 ] ? labelFont.lineHeight[ 2 ] : '' ) );
	const previewLabelMinHeight = getPreviewSize( previewDevice, ( undefined !== labelMinHeight && undefined !== labelMinHeight[ 0 ] ? labelMinHeight[ 0 ] : '' ), ( undefined !== labelMinHeight && undefined !== labelMinHeight[ 1 ] ? labelMinHeight[ 1 ] : '' ), ( undefined !== labelMinHeight && undefined !== labelMinHeight[ 2 ] ? labelMinHeight[ 2 ] : '' ) );
	const previewLabelAlign = getPreviewSize( previewDevice, ( undefined !== labelAlign[ 0 ] ? labelAlign[ 0 ] : '' ), ( undefined !== labelAlign[ 1 ] ? labelAlign[ 1 ] : '' ), ( undefined !== labelAlign[ 2 ] ? labelAlign[ 2 ] : '' ) );

	const [ marginControl, setMarginControl ] = useState( 'individual');
	const [ paddingControl, setPaddingControl ] = useState( 'individual');
	const [ borderControl, setBorderControl ] = useState( 'individual');


	const classes = classnames( className, {
		[ `kt-block-template${ uniqueID }` ]: uniqueID,
	} );

	const containerClasses = classnames( {
		'kb-block-progress-container': true,
		[ `kb-block-progress-container${ uniqueID }` ] : true,
	} );

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const layoutPresetOptions = [
		{ key: 'line', name: __( 'Line', 'kadence-blocks' ), icon: lineBar },
		{ key: 'circle', name: __( 'Circle', 'kadence-blocks' ), icon: circleBar },
		{ key: 'semicircle', name: __( 'Semicircle', 'kadence-blocks' ), icon: semiCircleBar }

	];

	const progressLabelStyles = {
		textAlign	 : previewLabelAlign,
		fontWeight   : labelFont.weight,
		fontStyle    : labelFont.style,
		color        : KadenceColorOutput( labelFont.color ),
		fontSize     : ( previewLabelFont ? previewLabelFont + labelFont.sizeType : undefined ),
		lineHeight   : ( previewLabelLineHeight ? previewLabelLineHeight + labelFont.lineType : undefined ),
		letterSpacing: labelFont.letterSpacing + 'px',
		textTransform: ( labelFont.textTransform ? labelFont.textTransform : undefined ),
		fontFamily   : ( labelFont.family ? labelFont.family : '' ),
		padding      : ( labelFont.padding ? labelFont.padding[ 0 ] + 'px ' + labelFont.padding[ 1 ] + 'px ' + labelFont.padding[ 2 ] + 'px ' + labelFont.padding[ 3 ] + 'px' : '' ),
		margin       : ( labelFont.margin ? labelFont.margin[ 0 ] + 'px ' + labelFont.margin[ 1 ] + 'px ' + labelFont.margin[ 2 ] + 'px ' + labelFont.margin[ 3 ] + 'px' : '' ),
	};

	const [animate,setAnimate] = useState(0.0)
	const container = document.createElement('div');
	const ProgressCircle = ({animate}) => {
		const circle = useMemo(()=>
		new Circle(container,{
			color: KadenceColorOutput( borderColor , borderOpacity ),
			strokeWidth: previewBarBorderTop,
			fill: KadenceColorOutput( barBackground , barBackgroundOpacity ),
			duration: 1200,

		}),[]);
		const node = useCallback( node => {
			if ( node ) {
				node.appendChild( container );
			}
		}, [] );

		useEffect( () => {
			circle.animate( animate );
		}, [ animate, circle ] );

		return <div ref={node} />;
	};

	const ProgressSemicircle = ({animate}) => {
		const semicircle = useMemo(()=>
		new SemiCircle(container,{
			color: KadenceColorOutput( borderColor , borderOpacity ),
			strokeWidth: previewBarBorderTop,
			fill: KadenceColorOutput( barBackground , barBackgroundOpacity ),
			duration: 1200,

		}),[]);
		const node = useCallback( node => {
			if ( node ) {
				node.appendChild( container );
			}
		}, [] );

		useEffect( () => {
			semicircle.animate( animate );
		}, [ animate, semicircle ] );

		return <div ref={node} />;
	};

	const saveLabelFont = ( value ) => {
		setAttributes( {
			labelFont: { ...labelFont, ...value },
		} );
	};
	const [ labelPaddingControl, setLabelPaddingControl ] = useState( 'linked' );
	const [ labelMarginControl, setLabelMarginControl ] = useState( 'individual' );

	return (
		<div { ...blockProps }>
			<BlockControls group="block">
				<BlockAlignmentControl
					value={ align }
					onChange={ ( value ) => setAttributes( { align: value } ) }
				/>
			</BlockControls>
			<InspectorControls>

				<Fragment>
					<h2>{__( 'Progress Bar Layout', 'kadence-blocks' )}</h2>
					<ButtonGroup className="kt-style-btn-group kb-info-layouts" aria-label={__( 'Progress Bar Layout', 'kadence-blocks' )}>
						{map( layoutPresetOptions, ( { name, key, icon } ) => (
							<Button
								key={key}
								className="kt-style-btn"
								isSmall
								isPrimary={false}
								aria-pressed={false}
								onClick={
									() => setAttributes( { barType: key } )
								}
							>
								{icon}
							</Button>
						) )}
					</ButtonGroup>
				</Fragment>

				<PanelBody
					title={ __( 'Size Controls', 'kadence-blocks' ) }
					initialOpen={ false }
				>
					<ResponsiveMeasurementControls
						label={ __( 'Padding', 'kadence-blocks' ) }
						value={ [ previewPaddingTop, previewPaddingRight, previewPaddingBottom, previewPaddingLeft ] }
						control={ paddingControl }
						tabletValue={ paddingTablet }
						mobileValue={ paddingMobile }
						onChange={ ( value ) => setAttributes( { paddingDesktop: value } ) }
						onChangeTablet={ ( value ) => setAttributes( { paddingTablet: value } ) }
						onChangeMobile={ ( value ) => setAttributes( { paddingMobile: value } ) }
						onChangeControl={ ( value ) => setPaddingControl( value ) }
						min={ 0 }
						max={ ( paddingUnit === 'em' || paddingUnit === 'rem' ? 24 : 200 ) }
						step={ ( paddingUnit === 'em' || paddingUnit === 'rem' ? 0.1 : 1 ) }
						unit={ paddingUnit }
						units={ [ 'px', 'em', 'rem', '%' ] }
						onUnit={ ( value ) => setAttributes( { paddingUnit: value } ) }
					/>
					<ResponsiveMeasurementControls
						label={ __( 'Margin', 'kadence-blocks' ) }
						value={ [ previewMarginTop, previewMarginRight, previewMarginBottom, previewMarginLeft ] }
						control={ marginControl }
						tabletValue={ marginTablet }
						mobileValue={ marginMobile }
						onChange={ ( value ) => {
							setAttributes( { marginDesktop: [ value[ 0 ], value[ 1 ], value[ 2 ], value[ 3 ] ] } );
						} }
						onChangeTablet={ ( value ) => setAttributes( { marginTablet: value } ) }
						onChangeMobile={ ( value ) => setAttributes( { marginMobile: value } ) }
						onChangeControl={ ( value ) => setMarginControl( value ) }
						min={ ( marginUnit === 'em' || marginUnit === 'rem' ? -12 : -200 ) }
						max={ ( marginUnit === 'em' || marginUnit === 'rem' ? 24 : 200 ) }
						step={ ( marginUnit === 'em' || marginUnit === 'rem' ? 0.1 : 1 ) }
						unit={ marginUnit }
						units={ [ 'px', 'em', 'rem', '%', 'vh' ] }
						onUnit={ ( value ) => setAttributes( { marginUnit: value } ) }
					/>

					<ResponsiveRangeControls
						label={__( 'Max-width', 'kadence-blocks' )}
						value={containerMaxWidth}
						onChange={value => setAttributes( { containerMaxWidth: value } )}
						tabletValue={( tabletContainerMaxWidth ? tabletContainerMaxWidth : '' )}
						onChangeTablet={( value ) => setAttributes( { tabletContainerMaxWidth: value } )}
						mobileValue={( mobileContainerMaxWidth ? mobileContainerMaxWidth : '' )}
						onChangeMobile={( value ) => setAttributes( { mobileContainerMaxWidth: value } )}
						min={0}
						max={( containerMaxWidthUnits == 'px' ? 3000 : 100 )}
						step={1}
						unit={containerMaxWidthUnits}
						onUnit={ ( value ) => setAttributes( { containerMaxWidthUnits: value } )}
						reset={ () => setAttributes( { containerMaxWidth: 200 , tabletContainerMaxWidth: '' , mobileContainerMaxWidth: '' })}
						units={[ 'px', 'vh' , '%' ]}
					/>
				</PanelBody>


				<PanelBody
					title={ __( 'Progress Bar Settings', 'kadence-blocks' ) }
					initialOpen={ false }
					panelName={'kb-testimonials-bar-settings'}
				>

					<PopColorControl
						label={ __( 'Bar Background', 'kadence-blocks' ) }
						colorValue={ ( barBackground ? barBackground : '#4A5568' ) }
						colorDefault={ '#4A5568' }
						opacityValue={ barBackgroundOpacity }
						onColorChange={ value => setAttributes( { barBackground: value } ) }
						onOpacityChange={ value => setAttributes( { barBackgroundOpacity: value } ) }
					/>
					<PopColorControl
						label={ __( 'Border Color', 'kadence-blocks' ) }
						colorValue={ ( borderColor ? borderColor : '#4A5568' ) }
						colorDefault={ '#4A5568' }
						opacityValue={ borderOpacity }
						onColorChange={ value => setAttributes( { borderColor: value } ) }
						onOpacityChange={ value => setAttributes( { borderOpacity: value } ) }
					/>
					<ResponsiveMeasurementControls
						label={ __( 'Bar Border', 'kadence-blocks' ) }
						control={(barType==="circle" ? 'slider': borderControl) }
						tabletControl={ borderControl }
						mobileControl={ borderControl }
						value={ containerBorder }
						tabletValue={ containerTabletBorder }
						mobileValue={ containerMobileBorder }
						onChange={ ( value ) => {
							setAttributes( { containerBorder: value } );
						} }
						onChangeTablet={ ( value ) => {
							setAttributes( { containerTabletBorder: value } );
						} }
						onChangeMobile={ ( value ) => {
							setAttributes( { containerMobileBorder: value } );
						} }
						onChangeControl={ ( value ) => setBorderControl( value ) }
						onChangeTabletControl={ ( value ) => setBorderControl( value ) }
						onChangeMobileControl={ ( value ) => setBorderControl( value ) }
						allowEmpty={ true }
						min={ 0 }
						max={ 50 }
						step={ 1 }
						unit={ containerBorderType }
						units={ [ '%' ] }
						onUnit={ ( value ) => setAttributes( { containerBorderType: value } ) }
					/>

				</PanelBody>

				<PanelBody
						title={__( 'Label Settings', 'kadence-blocks' )}
						initialOpen={false}
						panelName={'kb-testimonials-title-settings'}
					>
						<ToggleControl
							label={__( 'Show Label', 'kadence-blocks' )}
							checked={displayLabel}
							onChange={( value ) => setAttributes( { displayLabel: value } )}
						/>

						{displayLabel && (
							<Fragment>
								<SelectControl
									label={__( 'Label Position', 'kadence-blocks' )}
									options={
										[{ value: 'above', label: __( 'Above', 'kadence-blocks' )},
										{ value: 'below', label: __( 'Below', 'kadence-blocks' )},]
									}
									value={labelPosition}
									onChange={( value ) => setAttributes( { labelPosition: value } )}
								/>
								<PopColorControl
									label={__( 'Color Settings', 'kadence-blocks' )}
									value={( labelFont.color ? labelFont.color : '' )}
									default={''}
									onChange={value => saveLabelFont( { color: value } )}
								/>
								<ResponsiveAlignControls
									label={__( 'Text Alignment', 'kadence-blocks' )}
									value={( labelAlign && labelAlign[ 0 ] ? labelAlign[ 0 ] : '' )}
									mobileValue={( labelAlign && labelAlign[ 2 ] ? labelAlign[ 2 ] : '' )}
									tabletValue={( labelAlign && labelAlign[ 1 ] ? labelAlign[ 1 ] : '' )}
									onChange={( nextAlign ) => setAttributes( { labelAlign: [ nextAlign, ( labelAlign && labelAlign[ 1 ] ? labelAlign[ 1 ] : '' ), ( labelAlign && labelAlign[ 2 ] ? labelAlign[ 2 ] : '' ) ] } )}
									onChangeTablet={( nextAlign ) => setAttributes( { labelAlign: [ ( labelAlign && labelAlign[ 0 ] ? labelAlign[ 0 ] : '' ), nextAlign, ( labelAlign && labelAlign[ 2 ] ? labelAlign[ 2 ] : '' ) ] } )}
									onChangeMobile={( nextAlign ) => setAttributes( { labelAlign: [ ( labelAlign && labelAlign[ 0 ] ? labelAlign[ 0 ] : '' ), ( labelAlign && labelAlign[ 1 ] ? labelAlign[ 1 ] : '' ), nextAlign ] } )}
								/>
								<TypographyControls
									fontGroup={'heading'}
									tagLevel={labelFont.level}
									tagLowLevel={2}
									onTagLevel={( value ) => saveLabelFont( { level: value } )}
									fontSize={labelFont.size}
									onFontSize={( value ) => saveLabelFont( { size: value } )}
									fontSizeType={labelFont.sizeType}
									onFontSizeType={( value ) => saveLabelFont( { sizeType: value } )}
									lineHeight={labelFont.lineHeight}
									onLineHeight={( value ) => saveLabelFont( { lineHeight: value } )}
									lineHeightType={labelFont.lineType}
									onLineHeightType={( value ) => saveLabelFont( { lineType: value } )}
									letterSpacing={labelFont.letterSpacing}
									onLetterSpacing={( value ) => saveLabelFont( { letterSpacing: value } )}
									textTransform={labelFont.textTransform}
									onTextTransform={( value ) => saveLabelFont( { textTransform: value } )}
									fontFamily={labelFont.family}
									onFontFamily={( value ) => saveLabelFont( { family: value } )}
									onFontChange={( select ) => {
										saveLabelFont( {
											family: select.value,
											google: select.google,
										} );
									}}
									onFontArrayChange={( values ) => saveLabelFont( values )}
									googleFont={labelFont.google}
									onGoogleFont={( value ) => saveLabelFont( { google: value } )}
									loadGoogleFont={labelFont.loadGoogle}
									onLoadGoogleFont={( value ) => saveLabelFont( { loadGoogle: value } )}
									fontVariant={labelFont.variant}
									onFontVariant={( value ) => saveLabelFont( { variant: value } )}
									fontWeight={labelFont.weight}
									onFontWeight={( value ) => saveLabelFont( { weight: value } )}
									fontStyle={labelFont.style}
									onFontStyle={( value ) => saveLabelFont( { style: value } )}
									fontSubset={labelFont.subset}
									onFontSubset={( value ) => saveLabelFont( { subset: value } )}
									padding={labelFont.padding}
									onPadding={( value ) => saveLabelFont( { padding: value } )}
									paddingControl={labelPaddingControl}
									onPaddingControl={( value ) => setLabelPaddingControl( value )}
									margin={labelFont.margin}
									onMargin={( value ) => saveLabelFont( { margin: value } )}
									marginControl={labelMarginControl}
									onMarginControl={( value ) => setLabelMarginControl( value )}
								/>
								<ResponsiveRangeControls
									label={__( 'Label Min Height', 'kadence-blocks' )}
									value={( labelMinHeight && undefined !== labelMinHeight[ 0 ] ? labelMinHeight[ 0 ] : '' )}
									onChange={value => setAttributes( { labelMinHeight: [ value, ( labelMinHeight && undefined !== labelMinHeight[ 1 ] ? labelMinHeight[ 1 ] : '' ), ( labelMinHeight && undefined !== labelMinHeight[ 2 ] ? labelMinHeight[ 2 ] : '' ) ] } )}
									tabletValue={( labelMinHeight && undefined !== labelMinHeight[ 1 ] ? labelMinHeight[ 1 ] : '' )}
									onChangeTablet={( value ) => setAttributes( { labelMinHeight: [ ( labelMinHeight && undefined !== labelMinHeight[ 0 ] ? labelMinHeight[ 0 ] : '' ), value, ( labelMinHeight && undefined !== labelMinHeight[ 2 ] ? labelMinHeight[ 2 ] : '' ) ] } )}
									mobileValue={( labelMinHeight && undefined !== labelMinHeight[ 2 ] ? labelMinHeight[ 2 ] : '' )}
									onChangeMobile={( value ) => setAttributes( { labelMinHeight: [ ( labelMinHeight && undefined !== labelMinHeight[ 0 ] ? labelMinHeight[ 0 ] : '' ), ( labelMinHeight && undefined !== labelMinHeight[ 1 ] ? labelMinHeight[ 1 ] : '' ), value ] } )}
									min={0}
									max={200}
									step={1}
									unit={'px'}
									showUnit={true}
									units={[ 'px' ]}
								/>
							</Fragment>
						)}
				</PanelBody>
			</InspectorControls>
			<div className={ containerClasses } style={
				{
					marginTop: ( '' !== previewMarginTop ? previewMarginTop + marginUnit : undefined ),
					marginRight: ( '' !== previewMarginRight ? previewMarginRight + marginUnit : undefined ),
					marginBottom: ( '' !== previewMarginBottom ? previewMarginBottom + marginUnit : undefined ),
					marginLeft: ( '' !== previewMarginLeft ? previewMarginLeft + marginUnit : undefined ),

					paddingTop: ( '' !== previewPaddingTop ? previewPaddingTop + paddingUnit : undefined ),
					paddingRight: ( '' !== previewPaddingRight ? previewPaddingRight + paddingUnit : undefined ),
					paddingBottom: ( '' !== previewPaddingBottom ? previewPaddingBottom + paddingUnit : undefined ),
					paddingLeft: ( '' !== previewPaddingLeft ? previewPaddingLeft + paddingUnit : undefined ),

					maxWidth: ( '' !== previewContainerMaxWidth ? previewContainerMaxWidth + containerMaxWidthUnits : undefined)
				}
			}>

				{displayLabel && labelPosition === 'above' && (
					<div className="kt-progress-label-wrap" style={{
						minHeight: ( previewLabelMinHeight ? previewLabelMinHeight + 'px' : undefined ),
					}}>
						<RichText
							tagName={'h' + labelFont.level}
							value={ label }
							onChange={ ( value ) => {
								setAttributes( { label: value } );
							} }
							placeholder={__( 'Progress', 'kadence-blocks' )}
							style={ progressLabelStyles }
							className={'kt-progress-label'}
						/>
					</div>
				)}

					{(barType === "line") &&
						<div class="progress-bar__container" style={{
							backgroundColor: KadenceColorOutput( barBackground , barBackgroundOpacity ),
							borderTopWidth: previewBarBorderTop + containerBorderType,
							borderBottomWidth: previewBarBorderBottom + containerBorderType,
							borderRightWidth: previewBarBorderRight + containerBorderType,
							borderLeftWidth: previewBarBorderLeft + containerBorderType,
							borderColor:  KadenceColorOutput( borderColor , borderOpacity ),
							borderStyle: "solid"
							}}>
							<div class="progressbar-1">
								<span class="progress-bar__text"></span>
							</div>
						</div>
					}

					{(barType === "circle") &&
						<div class="circle-bars">
							<ProgressCircle animate={animate} />

							<button onClick={()=> setAnimate(Math.random())}>Click Me</button>
						</div>
					}

					{(barType === "semicircle") &&
						<div class="semicircle-bars">
							<ProgressSemicircle animate={animate} />
						</div>
					}
				{displayLabel && labelPosition === 'below' && (
					<div className="kt-progress-label-wrap" style={{
						minHeight: ( previewLabelMinHeight ? previewLabelMinHeight + 'px' : undefined ),
					}}>
						<RichText
							tagName={'h' + labelFont.level}
							value={ label }
							onChange={ ( value ) => {
								setAttributes( { label: value } );
							} }
							placeholder={__( 'Progress', 'kadence-blocks' )}
							style={ progressLabelStyles }
							className={'kt-progress-label'}
						/>
					</div>
				)}
				</div>

			</div>
	);
}

export default ( Edit );
