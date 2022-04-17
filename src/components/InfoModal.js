import React from 'react';
import { Parallax } from 'react-scroll-parallax';

import './InfoModal.scss';

const InfoModal = ({ modal, setModal }) => {
	return (
		<div className='info-modal'>
			<div className='container'>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'column',
						height: '100%'
					}}
				>
					{modal === 'contact' ? (
						<>
							<div>
								<b>E-mail</b>
							</div>
							<div>
								&#115;&#105;&#97;&#111;&#46;&#108;&#105;&#99;&#104;&#105;&#64;&#103;&#109;&#97;&#105;&#108;&#46;&#99;&#111;&#109;
							</div>
							<div style={{ marginTop: '40px' }}>
								<b>Mobile</b>
							</div>
							<div>&#43;&#52;&#57;&#49;&#55;&#55;&#54;&#53;&#53;&#50;&#49;&#54;&#50;</div>
						</>
					) : (
						<div>
							<Parallax translateX={[-50, 0]} opacity={[0.5, 2]} easing='ease' speed={10} shouldAlwaysCompleteAnimation>
								<p>
									Hsiao Li-Chi is a multimedia artist graduated from Berlin University of Art, her works take on a
									variety of forms such as Audio-Visual, sound, installations and live performances.{' '}
								</p>
							</Parallax>
							<Parallax translateX={[50, 0]} opacity={[0.5, 2]} easing='ease' speed={10} shouldAlwaysCompleteAnimation>
								<p>Her works are mostly about the relationship of herself, the internet, and social society.</p>
								<p>
									Recently, her works reach the field of artificial intelligence and blockchain, trying to imagine the
									virtual social activity of nearly future.
								</p>
							</Parallax>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default InfoModal;
