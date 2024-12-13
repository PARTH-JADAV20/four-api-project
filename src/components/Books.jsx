import React, { useState, useEffect } from 'react';
import './Books.css'

const Books = () => {
  const [language, setLanguage] = useState('en');
  const [data, setData] = useState([]);
  const [activeCategory, setActiveCategory] = useState('books');
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const booksResponse = await fetch(`https://potterapi-fedeperin.vercel.app/${language}/books`);
        const charactersResponse = await fetch(`https://potterapi-fedeperin.vercel.app/${language}/characters`);

        if (booksResponse.ok && charactersResponse.ok) {
          const booksData = await booksResponse.json();
          const charactersData = await charactersResponse.json();

          if (activeCategory === 'books') {
            setData(booksData);
          } else {
            setData(charactersData);
          }
        } else {
          console.error('Error fetching data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [language, activeCategory]);

  const handleMoreClick = (item) => {
    setModalData(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalData(null);
  };

  return (
    <div className="books-container">
      

      <div className="category-selection">
        <div className="language-selection">
        <select onChange={(e) => setLanguage(e.target.value)} value={language}>
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
          <option value="it">Italiano</option>
          <option value="pt">Português</option>
        </select>
      </div>
        <button onClick={() => setActiveCategory('books')} className={activeCategory === 'books' ? 'active' : ''}>Books</button>
        <button onClick={() => setActiveCategory('characters')} className={activeCategory === 'characters' ? 'active' : ''}>Characters</button>
      </div>

      <div className="cards-container">
        {data.map((item) => (
          <div key={item.index} className="card">
            <img src={item.cover || item.image} alt={item.title || item.fullName} className="card-image" />
            <h3>{item.title || item.fullName}</h3>
            <p>{item.releaseDate || item.hogwartsHouse}</p>
            <button className="more-button" onClick={() => handleMoreClick(item)}>
              More
            </button>
          </div>
        ))}
      </div>

      {/* Modal for displaying more details */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>&times;</span>
            <div className="modal-details">
              <div className="modal-image">
                <img src={modalData.cover || modalData.image} alt={modalData.title || modalData.fullName} />
                <h2 className="chbookname">{modalData.title || modalData.fullName}</h2>
              </div>
              <div className="modal-info">
                {activeCategory === 'books' ? (
                  <>
                    <p><strong>Original Title:</strong> {modalData.originalTitle}</p>
                    <p><strong>Release Date:</strong> {modalData.releaseDate}</p>
                    <p><strong>Description:</strong> {modalData.description}</p>
                    <p><strong>Pages:</strong> {modalData.pages}</p>
                  </>
                ) : (
                  <>
                    <p><strong>Full Name:</strong> {modalData.fullName}</p>
                    <p><strong>Nickname:</strong> {modalData.nickname}</p>
                    <p><strong>Birthdate:</strong> {modalData.birthdate}</p>
                    <p><strong>Hogwarts House:</strong> {modalData.hogwartsHouse}</p>
                    <p><strong>Interpreted By:</strong> {modalData.interpretedBy}</p>
                    <p><strong>Children:</strong> {modalData.children?.join(', ')}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Books;
