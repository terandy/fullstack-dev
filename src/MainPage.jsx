import React, { Component } from 'react';
import { Route, BrowserRouter, Link } from 'react-router-dom';
import styled from 'styled-components';

const Main = styled.div`
  margin-top: 6em;
  display: grid;
  height: 100vh;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    'shop-all shop-all'
    'woman man';
  padding: 0;
  @media screen and (min-width: 968px) {
    margin-top: 4em;
    grid-template-rows: 0.5fr 0.6fr;
  }
`;
const ShopAll = styled.div`
  grid-area: shop-all;
  border: solid white 5px;
  background-color: teal;
  display: flex;
  justify-content: center;
  align-items: center;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  a {
    color: white;
    border: white solid 2px;
    padding: 1em;
    width: 30%;
    display: flex;
    justify-content: center;
    &:hover {
      color: lightgrey;
      border: lightgrey solid 2px;
    }
  }
`;
const Woman = styled(ShopAll)`
  grid-area: woman;
  background-image: url('../uploads/woman.jpeg');
`;
const Man = styled(ShopAll)`
  grid-area: man;
  background-image: url('../uploads/man.jpeg');
`;

class MainPage extends Component {
  render = () => {
    return (
      <Main>
        <ShopAll>
          <Link to="/shop">ShopAll</Link>
        </ShopAll>

        <Woman>
          <Link to="/women">Woman</Link>
        </Woman>

        <Man>
          <Link to="/men">Man</Link>
        </Man>
      </Main>
    );
  };
}

export default MainPage;
