import { useState, useCallback } from "react";

const STORAGE_KEY = "juriki_favoritos";

function getFavoritos() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

export function useFavoritos() {
  const [favoritos, setFavoritos] = useState(getFavoritos);

  const toggleFavorito = useCallback((advogadoId) => {
    setFavoritos((prev) => {
      const next = prev.includes(advogadoId)
        ? prev.filter((id) => id !== advogadoId)
        : [...prev, advogadoId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isFavorito = useCallback(
    (advogadoId) => favoritos.includes(advogadoId),
    [favoritos]
  );

  return { favoritos, toggleFavorito, isFavorito };
}
