import React from 'react';
import '../css/Facilities.css'

const Facilities = () => {
  const facilities = [
    "Çamaşır ve Ütü Odası",
    "Etüt Odası",
    "Asansör",
    "Sınırsız İnternet",
    "Çalışma Masası",
    "Balkonlu Oda",
    "Mini Buzdolabı",
    "Kişisel Dolap",
    "Bütün oda tiplerinde lavabo, duş ve WC",
    "Kamera Sistemi",
    "Günlük Temizlik",
    "24 Saat Güvenlik",
    "Hobi ve Oyun Odası"
  ];

  return (
    <div className="facilities-container">
      <h2>Yurdun Sağladığı İmkanlar</h2>
      <div className="facilities-grid">
        {facilities.map((facility, index) => (
          <div className="facility-item" key={index}>
            <i className="fa fa-arrow-right"></i>
            <span>{facility}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Facilities;
