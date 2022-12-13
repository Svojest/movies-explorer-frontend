import React from 'react';
import './Popup.css';

const Popup = ({ text, isOpen, onClose }) => {
	return (
		<div className={`popup ${isOpen && 'popup_opened'}`}>
			<div className='popup__container'>
				<button type='button' className='popup__close' onClick={onClose}></button>
				<p className='popup__paragraph'>{text}</p>
			</div>
		</div>
	);
};

export default Popup;
