import React, { FC } from 'react';
import classes from './card.module.scss';

type ToyProps = {
  color: string,
  count: string,
  favorite: boolean,
  name: string,
  num: string,
  shape: string,
  size: string,
  year: string,
};

type Toy = {
  card: ToyProps
};

export const Card: FC<Toy> = ({
  card,
}) => (
  <div className={classes.cardToy}>
    {card.color}
    {card.count}
    {card.favorite}
    {card.name}
    {card.num}
    {card.shape}
    {card.size}
    {card.year}
  </div>
);
