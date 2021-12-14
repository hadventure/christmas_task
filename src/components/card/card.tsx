import React, { FC } from 'react';
import classes from './card.module.scss';

console.log(classes);

type CardProps = {
  color: string
  name: string
  cheap?: boolean
};

export const Card: FC<CardProps> = ({ color, name }) => (
  <article className={classes.card}>
    {name}
  </article>
);
