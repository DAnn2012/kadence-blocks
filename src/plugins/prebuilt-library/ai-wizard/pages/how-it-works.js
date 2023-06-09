/**
 * WordPress dependencies
 */
import { Flex, FlexBlock } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const styles = {
	background: {
		flexGrow: 1,
		background: 'linear-gradient(90deg, rgba(0, 115, 230, 0) 0, rgba(0, 115, 230, 0) 60%, #0073E6 99.44%)',
	},
	headline: {
		maxWidth: 420,
	},
	content: {
		maxWidth: 480,
		marginLeft: 32,
	},
	imageWrapper: {
		overflow: 'hidden',
	},
	image: {
		maxHeight: '60vh',
		borderRadius: 8,
	}
}

const headline = __('Take your website creation to the next level with Kadence AI.', 'kadence');
const content = __('Kadence AI creates a website building experience no other builder can offer. Our powerful technology generates content in fully designed Kadence patterns to meet your mission and goals in a seamless, intuitive experience. Say goodbye to generic placeholder text and blank screen anxiety. Welcome to elegant and effective content that represents your brand and connects with your audience.', 'kadence');

export function HowItWorks() {
	return (
		<Flex style={ styles.background }>
			<Flex gap={ 22.5 }>
				<FlexBlock>
					<Flex
						className={ 'inner' }
						justify="end"
					>
						<FlexBlock style={ styles.content } className={ 'stellarwp-body' }>
							<h1 className="stellarwp-h1" style={ styles.headline }>
								{ headline }
							</h1>
							<p>
								{ content }
							</p>
						</FlexBlock>
				</Flex>
				</FlexBlock>
				<FlexBlock style={ styles.imageWrapper }>
					<img
						src="https://placehold.co/2000x1400"
						style={ styles.image }
					/>
				</FlexBlock>
			</Flex>
		</Flex>
	);
}

