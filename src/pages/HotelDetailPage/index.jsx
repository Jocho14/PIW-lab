import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../services/init";

import mail from "../../assets/Mail.svg";
import "./styles.css";

const HotelDetailPage = () => {
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const hotelDoc = doc(firestore, "hotel_data", "hotel_" + hotelId);
        const hotelSnapshot = await getDoc(hotelDoc);

        if (hotelSnapshot.exists()) {
          setHotel(hotelSnapshot.data());
        } else {
          console.log("No such document!");
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching hotel:", error);
        setLoading(false);
      }
    };

    fetchHotel();
  }, [hotelId]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!hotel) {
    return <h1>Hotel not found</h1>;
  }

  return (
    <section className="grid card-detail">
      <div className="detail-view">
        <h1 className="title-large detail-view-title">{hotel.name}</h1>
        <div
          className="detail-view-img"
          style={{ backgroundImage: `url(${hotel.imageUrl})` }}
        ></div>
      </div>
      <div className="detail-info">
        <div className="detail-info-essentials">
          <h4>
            <span className="bold">Location:</span> {hotel.location}
          </h4>
          <h4>
            <span className="bold">Local category:</span> {hotel.rating}
          </h4>
          <h4>
            <span className="bold">Price:</span> {hotel.price}
            {hotel.currency}/room/night
          </h4>
          <div className="detail-info-essentials-description">
            <h4>
              <span className="bold">Description:</span>
            </h4>
            <p>{hotel.description}</p>
          </div>
        </div>
        <button className="detail-info-button">
          Contact <img src={mail} />
        </button>
        <div className="detail-info-images">
          <img className="detail-info-image" src={hotel.imageUrl} />
          <img className="detail-info-image" src={hotel.imageUrl} />
        </div>
      </div>
    </section>
  );
};

export default HotelDetailPage;
