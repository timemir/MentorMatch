import React, { useState } from "react";
import Card, { CardProps } from "../Card/Card";

/*
  This component is used to display a list of cards.
*/
export default function CardList({ cardData }: { cardData: CardProps[] }) {
  const [data] = useState<CardProps[]>(cardData);
  return (
    <div className="grid grid-cols-1 place-items-center content-center items-center gap-4 md:grid-cols-2 md:p-4 lg:grid-cols-3 ">
      {data.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          title={card.title}
          description={card.description}
          buttonText={card.buttonText}
          image={card.image}
          imageAlt={card.imageAlt}
          link={card.link}
          matchScore={card.matchScore}
        />
      ))}
    </div>
  );
}
