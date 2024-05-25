import { useState, useEffect } from "react";
import HotelCardGroup from "../../components/HotelCardGroup";
import { firestore } from "../../services/init";
import { collection, getDocs } from "firebase/firestore";

import ArrowIcon from "../../assets/Arrow.svg";
import "./styles.css";

const ExplorePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortAttribute, setSortAttribute] = useState("name");

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const hotelCollection = collection(firestore, "hotel_data");
        const hotelSnapshot = await getDocs(hotelCollection);
        const hotelList = hotelSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setHotels(hotelList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hotels:", error);
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleSortChange = (event) => {
    setSortAttribute(event.target.value);
  };

  const sortHotels = (hotels, attribute) => {
    return hotels.sort((a, b) => {
      if (attribute === "price") {
        return a.price - b.price;
      } else {
        if (a[attribute] < b[attribute]) return -1;
        if (a[attribute] > b[attribute]) return 1;
        return 0;
      }
    });
  };

  const filteredData = hotels.filter(
    (hotel) =>
      hotel.name.toLowerCase().includes(searchTerm) ||
      hotel.location.toLowerCase().includes(searchTerm) ||
      hotel.description.toLowerCase().includes(searchTerm) ||
      hotel.price.toString().toLowerCase().includes(searchTerm) ||
      hotel.currency.includes(searchTerm)
  );

  const sortedData = sortHotels(filteredData, sortAttribute);

  return (
    <div>
      <section id="hero" className="grid hero-section">
        <article className="hero-details">
          <p className="title-large">Welcome, your tranquillity oasis awaits</p>
        </article>
      </section>
      <section id="browse" className="browse-section">
        <p className="title-middle">Explore the hotels</p>
        <input
          className="searchbar"
          placeholder="Search by hotel name, place, description etc."
          onChange={handleSearchChange}
        />
        <div className="sort-options">
          <label htmlFor="sort">Sort by: </label>
          <select id="sort" onChange={handleSortChange} value={sortAttribute}>
            <option value="name">Name</option>
            <option value="location">Location</option>
            <option value="price">Price</option>
          </select>
        </div>
        {loading ? (
          <h1>Loading hotels...</h1>
        ) : sortedData.length > 0 ? (
          <HotelCardGroup data={sortedData} />
        ) : (
          <h1>No hotels found</h1>
        )}
      </section>
      <section id="rent" className="footer grid">
        <div className="card-image"></div>
        <article className="footer-details">
          <p className="title-large">Rent with us!</p>
          <p className="text-middle">
            If you’re a hotel or an apartament owner who’s looking to reach more
            customers you can now rent your property with TranquilTravels.{" "}
          </p>
          <button className="button secondary">
            Learn more <img src={ArrowIcon} />
          </button>
        </article>
      </section>
    </div>
  );
};

export default ExplorePage;
