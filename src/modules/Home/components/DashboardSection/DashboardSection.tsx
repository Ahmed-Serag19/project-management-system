import React from "react";

interface Card {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  backgroundColor: string;
  iconBackgroundColor: string;
}

interface DashboardSectionProps {
  title: string;
  description: string;
  cards: Card[];
}

const DashboardSection: React.FC<DashboardSectionProps> = ({
  title,
  description,
  cards,
}) => {
  return (
    <div className="dashboard-section">
      <div className="section-header">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="cards-container">
        {cards.map((card, index) => (
          <div
            key={index}
            className="card"
            style={{ backgroundColor: card.backgroundColor }}
          >
            <div
              style={{ backgroundColor: card.iconBackgroundColor }}
              className="icon"
            >
              {card.icon}
            </div>
            <div className="card-content">
              <p className="label">{card.label}</p>
              <h2 className="value">{card.value}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardSection;
