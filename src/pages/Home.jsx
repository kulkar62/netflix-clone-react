import React from "react";
import Banner from "../components/Banner";
import Row from "../components/Row";
import requests from "../Requests";

const Home = () => {
  return (
    <div>
      <Banner />
      <Row rowID="1" title="Popular" fetchURL={requests.popular} />
      <Row rowID="2" title="Top Rated" fetchURL={requests.topRated} />
      <Row rowID="3" title="Family" genre="family" />
      <Row rowID="4" title="Comedy" genre="comedy" />
      <Row rowID="5" title="Action and Adventure" genre="action" />
      <Row rowID="6" title="Romance" genre="romance" />
      <Row rowID="7" title="Mystery" genre="mystery" />
      <Row rowID="8" title="Horror" genre="horror" />
      <Row rowID="9" title="Drama" genre="drama" />
    </div>
  );
};

export default Home;
