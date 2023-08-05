import React, { useState, useEffect } from 'react';
import './profile.css';
import axios from 'axios';

import { AiOutlineMail, AiOutlinePhone, AiOutlineGlobal, AiOutlineHeart, AiFillHeart, AiOutlineEdit, AiFillDelete } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import Card from 'react-bootstrap/Card';
import { ModalBox } from './Modal';

export const Profiles = () => {
  const [userData, setUserData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const getData = async () => {
    try {
      const res = await axios.get(`https://jsonplaceholder.typicode.com/users`);
      const likedData = res.data.map((item) => ({ ...item, isLiked: false }));
      setUserData(likedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleLike = (id) => {
    setUserData((prevData) =>
      prevData.map((item) => (item.id === id ? { ...item, isLiked: !item.isLiked } : item))
    );
  };

  const handleDelete = (id) => {
    setUserData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const handleModal = (id) => {
    const selectedItem = userData.find((item) => item.id === id);
    setSelectedItem(selectedItem);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  const handleUpdateData = (updatedData) => {
    setUserData((prevData) =>
      prevData.map((item) => (item.id === updatedData.id ? { ...updatedData } : item))
    );
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='profileContainer'>
      {userData?.map((item) => (
        <div key={item.id}>
          <Card>
            <div className='imageBox'>
              <img src={`https://avatars.dicebear.com/v2/avataaars/${item.username}.svg`} alt='' />
            </div>
            <div className='textBox'>
              <h6>{item.name}</h6>
              <p className='paradetails'>
                <AiOutlineMail fontSize={'20px'} /> {item.email}
              </p>
              <p className='paradetails'>
                <AiOutlinePhone fontSize={'20px'} /> {item.phone}
              </p>
              <p className='paradetails'>
                <AiOutlineGlobal fontSize={'20px'} /> {item.website}
              </p>
            </div>

            <div className='actionsOnCards'>
              <IconContext.Provider value={{ className: 'likeHeart' }}>
                <div onClick={() => handleLike(item.id)}>
                  {!item.isLiked ? <AiOutlineHeart /> : <AiFillHeart />}
                </div>
              </IconContext.Provider>
              |
              <IconContext.Provider value={{ className: 'editClass' }}>
                <AiOutlineEdit onClick={() => handleModal(item.id)} />
              </IconContext.Provider>
              |
              <IconContext.Provider value={{ className: 'editClass' }}>
                <AiFillDelete onClick={() => handleDelete(item.id)} />
              </IconContext.Provider>
            </div>
          </Card>
        </div>
      ))}

      <ModalBox show={selectedItem !== null} handleClose={handleCloseModal} dataToShow={selectedItem} onUpdate={handleUpdateData} />
    </div>
  );
};
