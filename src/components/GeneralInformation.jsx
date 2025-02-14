import React from 'react';
import { Person, LocationOn, Phone, WhatsApp, Print, Email } from '@mui/icons-material';
import { Button } from '@mui/material';
import '../css/GeneralInformation.css'

const GeneralInformation = () => {
  return (
    <div className='general-info-main'>
      <div className="general-info-container">
        <h2>Genel Bilgiler</h2>
        <p>
          Yurdumuz, öğrencilere hem akademik hem de sosyal açıdan konforlu ve güvenli bir yaşam alanı sunmaktadır. 
          Yenilenen modern yapısı, kaliteli hizmetleri ve güler yüzlü personeli ile öğrencilerimize rahat bir yaşam sağlamayı hedefliyoruz.
        </p>
        <p>
          Yurdumuz, Bahçelievler semtinin merkezine oldukça yakın bir konumda yer almakta olup, öğrencilere birçok sosyal imkan ve ulaşım kolaylığı sağlamaktadır.
          Yurt binamız, modern iç yapısı ve tamamen otel konforunda tasarlanmış odaları ile dikkat çekmektedir.
        </p>
        <p>
          Öğrencilerimizin konforu için her odada WC, banyo, TV, buzdolabı, çalışma masası ve kişiye özel gardırop gibi olanaklar sunulmaktadır. Ayrıca, 
          odalarımızda yüksek hızda internet erişimi bulunmaktadır.
        </p>
        <p>
          Bahçelievler Yurdu'nda öğrencilerimiz, rahat bir ortamda ders çalışabilir, sosyal aktivitelerle vakit geçirebilir ve huzurlu bir yaşam sürdürebilir.
        </p>
        <p>
          Yurdumuzun sunduğu imkanlar arasında 24 saat sıcak su, çamaşırhane hizmetleri, etüt salonları, spor salonu, restoran ve dinlenme alanları yer almaktadır.
        </p>
        
      </div>
      
      <div>
        <div className="sidebar__single sidebar__comments">
          <h3 className="sidebar__title">İletişim Bilgileri</h3>
          <ul className="sidebar__comments-list list-unstyled">
            <li>
              <div className="sidebar__comments-icon">
                <Person /> {/* Material UI Person Icon */}
              </div>
              <div className="sidebar__comments-text-box">
                <h5>Yurt Müdürü</h5>
                <p>Ülkü Öner</p>
              </div>
            </li>
            <li>
              <div className="sidebar__comments-icon">
                <LocationOn /> {/* Material UI LocationOn Icon */}
              </div>
              <div className="sidebar__comments-text-box">
                <h5>Adres</h5>
                <p>Bahçelievler 66. Sk. (Eski 18. Sk.) No:14 Bahçelievler Çankaya / ANKARA</p>
              </div>
            </li>
            <li>
              <div className="sidebar__comments-icon">
                <Phone /> {/* Material UI Phone Icon */}
              </div>
              <div className="sidebar__comments-text-box">
                <h5>Telefon</h5>
                <a href="tel: 0312 212 62 72"><p>0312 212 62 72</p></a>
              </div>
            </li>
            <li>
              <div className="sidebar__comments-icon">
                <WhatsApp /> {/* Material UI WhatsApp Icon */}
              </div>
              <div className="sidebar__comments-text-box">
                <h5>WhatsApp</h5>
                <a href="https://api.whatsapp.com/send?phone=905326143871"><p>05326143871</p></a>
              </div>
            </li>
            <li>
              <div className="sidebar__comments-icon">
                <Print /> {/* Material UI Print Icon */}
              </div>
              <div className="sidebar__comments-text-box">
                <h5>Faks</h5>
                <p>0312 213 41 40</p>
              </div>
            </li>
            <li>
              <div className="sidebar__comments-icon">
                <Email /> {/* Material UI Email Icon */}
              </div>
              <div className="sidebar__comments-text-box">
                <h5>E-Mail</h5>
                <a href="mailto:info@erkekogrenciyurdu.com"><p>info@erkekogrenciyurdu.com</p></a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GeneralInformation;
