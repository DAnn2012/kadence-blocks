/* global wp */
 /**
  * External dependencies
  */
 import Select from 'react-select';
 import { __ } from '@wordpress/i18n';
 import { useState, useEffect } from '@wordpress/element';
 import { Spinner } from '@wordpress/components';
 import { addQueryArgs } from '@wordpress/url';
 import apiFetch from '@wordpress/api-fetch';
 import TermSelect from './term-select';
 import { useInstanceId } from '@wordpress/compose';
 import { isArrayLike, isEmpty } from 'lodash';
 
 export default function TaxonomySelect( {
     label,
     value,
     onChange,
     source,
     contextPost = null,
     className = null,
     termIsMulti = false,
     taxOnly = false,
     termIsOptional = false,
     } ) {
     const instanceId = useInstanceId( TaxonomySelect );
     const id = `inspector-taxonomy-select-control-${ instanceId }`;
     const [ isLoading, setIsLoading ] = useState( true );
     const [ taxonomies, setTaxonomies ] = useState( [] );
     let taxStart = '';
     if( taxOnly || ( termIsOptional && typeof(value) == 'string' ) ) {
         taxStart = value;
     } else {
         taxStart = isArrayLike(value) && !isEmpty(value) ? value[0].value.split('|') : value && !isEmpty(value) ? value.split('|') : [''];
     }
     const [ tax, setTax ] = useState( typeof(taxStart) == 'object' ? taxStart[0] : taxStart );
     useEffect( () => {
         let theSource = source ? source : contextPost;
         if ( wp.data.select( 'core/editor' ) && ! theSource ) {
             if ( kbpData.isKadenceE && kadenceElementParams.previewPostID ) {
                 const postId = TryParseJSON( kadenceElementParams.previewPostID );
                 theSource = postId && postId.id ? postId.id : '';
             } else {
                 theSource = wp.data.select( 'core/editor' ).getCurrentPostId();
             }
         }
         const options = {
             source: theSource,
         };
         setIsLoading( true );
         apiFetch( {
             path: addQueryArgs(
                 window.kbpData.taxonomiesEndpoint,
                 options
             ),
         } )
         .then( ( taxonomyItems ) => {
             if ( ! taxonomyItems ) {
                 setTaxonomies( [] );
             } else {
                 setTaxonomies( taxonomyItems );
             }
             setIsLoading( false );
         } )
         .catch( () => {
             setIsLoading( false );
             setTaxonomies( [] );
         } );
     }, [ source ] );
     if ( isLoading ) {
         return (
             <Spinner />
         );
     }
     const customStyles = {
         menuPortal: (provided) => ({
             ...provided,
             zIndex: 99999999,
         })
     }
     return (
         <div className={ `components-base-control kb-taxonomy-select-control${ className ? ' ' + className : '' }` }>
             { label && (
                 <label
                     htmlFor={ id }
                     className="components-taxonomy-select-control__label kb-dynamic-components-label"
                 >
                     { label }
                 </label>
             ) }
             <Select
                 options={ taxonomies }
                 id={ id }
                 className="kb-dynamic-select"
                 classNamePrefix="kbp"
                 value={ ( '' !== tax ? taxonomies.filter( ( { value } ) => value === tax ) : '' ) }
                 isMulti={ false }
                 isSearchable={ true }
                 isClearable={ true }
                 menuPortalTarget={ document.body }
                 styles={ customStyles }
                 maxMenuHeight={ 200 }
                 placeholder={ __( 'Select Taxonomy', 'kadence-blocks-pro' ) }
                 onChange={ ( val ) => {
                     if ( taxOnly || termIsOptional ) {
                         if ( ! val ) {
                             setTax( '' );
                             onChange( '' );
                         } else {
                             setTax( val.value );
                             onChange( val.value );
                         }
                     } else {
                         if ( ! val ) {
                             setTax( '' );
                         } else {
                             setTax( val.value );
                         }
                     }
                 } }
             />
             { '' !== tax && ! taxOnly && (
                 <TermSelect
                     source={ tax }
                     value={ value }
                     isMulti={ termIsMulti }
                     onChange={ ( val ) => {
                         if ( val && ! isEmpty(val) ) {
                             onChange( val );
                         } else if ( termIsOptional && tax) {
                             onChange( tax );
                         } else {
                             onChange( '' );
                         }
                     } }
                 />
             )}
         </div>
     );
 } 