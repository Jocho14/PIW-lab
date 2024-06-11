import { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../services/init";
import { CartContext } from "../../contexts/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import mail from "../../assets/Mail.svg";
import "./styles.css";

const HotelDetailPage = () => {
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const messageRef = useRef();
  const { dispatch } = useContext(CartContext);

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

  const addToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: { ...hotel, id: hotelId } });
    toast.success(`${hotel.name} has been added to your cart.`);
  };

  const handleSendMessage = () => {
    const message = messageRef.current.value;
    setIsDialogOpen(false);
    toast.success("Message has been sent!");
  };

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
        <button
          className="detail-info-button"
          onClick={() => setIsDialogOpen(true)}
        >
          Contact <img src={mail} alt="Contact" />
        </button>
        <button className="add-to-cart-button" onClick={addToCart}>
          Add to Cart
        </button>
        <div className="detail-info-images">
          <img
            className="detail-info-image"
            src={hotel.imageUrl}
            alt={hotel.name}
          />
          <img
            className="detail-info-image"
            src={hotel.imageUrl}
            alt={hotel.name}
          />
        </div>
      </div>

      {isDialogOpen && (
        <div className="dialog-overlay">
          <div className="dialog">
            <h2>Send a Message</h2>
            <textarea
              ref={messageRef}
              placeholder="Type your message here..."
            ></textarea>
            <button onClick={handleSendMessage}>Send</button>
            <button onClick={() => setIsDialogOpen(false)}>Cancel</button>
          </div>
        </div>
      )}

      <ToastContainer />
    </section>
  );
};

export default HotelDetailPage;
