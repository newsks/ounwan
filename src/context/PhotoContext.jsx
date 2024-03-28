import React, {createContext, useContext, useState} from 'react';

const PhotoContext = createContext();

export const usePhotos = () => useContext(PhotoContext);

export const PhotoProvider = ({children}) => {
  const [photos, setPhotos] = useState([]);

  return (
    <PhotoContext.Provider value={{photos, setPhotos}}>
      {children}
    </PhotoContext.Provider>
  );
};
