import React, { Component } from 'react';
import { Route, BrowserRouter, Link } from 'react-router-dom';
import styled from 'styled-components';

const Main = styled.div`
  width:100%;
  
  margin-top: 6em;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    'woman man'
    'shop-all shop-all';
    
  padding: 0;
  @media screen and (min-width: 968px) {
    width:900px;
    margin-top: 4em;
    grid-template-rows: 0.5fr 0.6fr;
  }
  @media screen and (min-width: 1200px) {
    width:1200px
  }
`;
const ShopAll = styled.div`
  height:200px;
  grid-area: shop-all;
  border: solid white 5px;
  background-color: #222324;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('https://images.unsplash.com/photo-1551488831-68b4d0c92c13?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  a {
    color: white;
    font-family: "Lato";
    font-weight: 900;
    font-size:2em;
    text-shadow: 0px 0px 10px #222324;
    &:hover {
      color: #dedede;
    }
  }
  @media screen and (max-width: 968px) {
    height:150px
  }
`;
const Woman = styled(ShopAll)`
  height:400px;
  grid-area: woman;
  background-position-y: 5%;
  background-image: url('https://images.unsplash.com/photo-1513387170035-7cc8ccd63f7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3101&q=80');
  a {
    display: flex;
    justify-content: flex-start;
    height: 95%;
    width: 95%;
    align-items: flex-end;
  }
  @media screen and (max-width: 968px) {
    height:350px;
  }
`;
const Man = styled(ShopAll)`
  height:400px;
  grid-area: man;
  background-image: url('https://images.unsplash.com/photo-1552060405-f2081b6e7951?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1300&q=80');
  a {
    display: flex;
    justify-content: flex-end;
    height: 95%;
    width: 95%;
    align-items: flex-start;
  }
  @media screen and (max-width: 968px) {
    height:350px;
  }
`;

class MainPage extends Component {
  render = () => {
    return (
      <div style={{display: "flex", justifyContent: "center"}}>
      <Main>

        <Woman>
          <Link to="/women">Woman</Link>
        </Woman>

        <Man>
          <Link to="/men">Man</Link>
        </Man>

        <ShopAll>
          <Link to="/shop">Shop All</Link>
        </ShopAll>
      </Main>
      </div>
    );
  };
}

export default MainPage;
