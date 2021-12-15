import React, { useState, ChangeEvent, useEffect } from 'react';
import { Card } from '../card/card';

export const Cards = () => {
  const [filter, setFilter] = useState('');
  const [toys, setToys] = useState([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    async function fetchToys() {
      const result = await fetch('/src/data.json');
      const data = await result.json();
      setToys(data);
    }

    fetchToys();
  }, []);

  return (
    <section>
      {
        toys
          .filter((card) => card.name.toUpperCase().includes(filter.toUpperCase()))
          .map((card) => (
            <Card
              key={card.num}
              card={card}
            />
          ))
      }
      <input value={filter} onChange={handleChange} />
    </section>
  );
};
