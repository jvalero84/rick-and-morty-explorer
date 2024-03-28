import styled from "styled-components";
import { Container, Button } from "react-bootstrap";

export const ListContainer = styled(Container)`
  color: black;
  font-size: 1em;
  width: 90%;
  height: 90%;
  margin: auto;
  padding: 0.6em 1em;
  //border: 2px solid green;
  border-radius: 3px;
`;

export const TitleSection = styled(Container)`
  //display: table;
  &:after {
    content: "";
    display: table;
    clear: both;
  }
`;

export const TitleLeftCol = styled.div`
  width: 10%;
  float: left;
`;

export const TitleRightCol = styled.div`
  width: 90%;
  float: left;
`;

export const ListTitle = styled.p`
  font: 700 32px Roboto Condensed, sans-serif;
  padding-right: 70px;
  text-align: center;
  justify-self: center;
`;

export const Table = styled.table`
  width: 100%;
  //height: 800px;
  border-collapse: collapse;
  overflow: hidden;
  margin-bottom: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

export const Td = styled.td`
  padding: 15px;
  background-color: rgba(255, 255, 255, 0.2);
  color: black;
`;

export const Th = styled.th`
  padding: 15px;
  background-color: rgba(255, 255, 255, 0.2);
  color: #fff;
  text-align: left;
`;

export const TheadTh = styled(Th)`
  background-color: #55608f;
`;

export const TbodyTr = styled.tr`
  &:hover {
    background-color: lightgoldenrodyellow;
    cursor: pointer;
  }
`;

export const TbodyTd = styled(Td)`
  position: relative;
  color: black;
  /* content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: -9999px;
  bottom: -9999px;
  background-color: rgba(255, 255, 255, 0.2);
  z-index: -1; */
`;

export const PagButton = styled(Button)`
  background-color: #55608f;
  --bs-btn-hover-bg: #b8b0d4;
  --bs-btn-disabled-bg: #8b8799;
`;
