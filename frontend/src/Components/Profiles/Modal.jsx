import React, { useState, useEffect } from 'react';
import './model.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const ModalBox = ({ show, handleClose, dataToShow, onUpdate }) => {
    const [formData, setFormData] = useState({ ...dataToShow });

    useEffect(() => {
        setFormData({ ...dataToShow });
    }, [dataToShow]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleUpdate = () => {
        onUpdate(formData);
        handleClose();
    };

    if (!show || !dataToShow) return null;
    return (
        <div className='modelPosition'>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form className='formClass'>
                        <div>
                            <label htmlFor="name"><span style={{ color: 'red', fontSize: "20px" }}>*</span>Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name || ''}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email"><span style={{ color: 'red', fontSize: "20px" }}>*</span>Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email || ''}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="phone"><span style={{ color: 'red', fontSize: "20px" }}>*</span>Phone:</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone || ''}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="website"><span style={{ color: 'red', fontSize: "20px" }}>*</span>Website:</label>
                            <input
                                type="url"
                                id="website"
                                name="website"
                                value={formData.website || ''}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button className='cancelButton' onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button className='OKButton' onClick={handleUpdate}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
