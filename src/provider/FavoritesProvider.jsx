import React, { useState, useEffect } from "react";

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("favorites") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (toy) => {
    setFavorites((prev) => {
      if (prev.find((t) => t.toyId === toy.toyId)) return prev;
      return [...prev, toy];
    });
  };

  const removeFavorite = (toyId) => {
    setFavorites((prev) => prev.filter((t) => t.toyId !== toyId));
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
