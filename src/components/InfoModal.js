import React from 'react';
import MaterialIcon from '@material/react-material-icon';
import {Transition} from 'react-transition-group';
import {TweenMax} from 'gsap/all';
import './InfoModal.scss';

const startState = {autoAlpha: 0};

const InfoModal = ({modal, setModal}) => {
    return (
        <Transition
            unmountOnExit
            in={modal ? true : false}
            timeout={1000}
            onEnter={(node) => TweenMax.set(node, startState)}
            addEndListener={(node, done) => {
                TweenMax.to(node, 0.5, {
                    autoAlpha: modal ? 1 : 0,
                    onComplete: done,
                });
            }}
        >
            <div className='info-modal'>
                <div className='container'>
                    <div className='close-button' onClick={() => setModal(false)}>
                        <MaterialIcon icon='close' />
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            height: '100%',
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
                                <div style={{marginTop: '40px'}}>
                                    <b>Mobile</b>
                                </div>
                                <div>&#43;&#52;&#57;&#49;&#55;&#55;&#54;&#53;&#53;&#50;&#49;&#54;&#50;</div>
                            </>
                        ) : (
                            <p>
                                Hsiao Li-Chi is a multimedia artist graduated from Berlin University of Art, her works
                                take on a variety of forms such as Audio-Visual, sound, installations and live
                                performances. Her works are mostly about the relationship of herself, the internet, and
                                social society. Recently, her works reach the field of artificial intelligence and
                                blockchain, trying to imagine the virtual social activity of nearly future.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </Transition>
    );
};

export default InfoModal;
