import { styled } from "styled-components";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";

export const Section = styled(Container)`
  width: 100%;
  display: flex;
  padding-top: 20px;
  padding-bottom: 20px;
`;

export const LeftCol = styled(Col)`
  width: 30%;
  text-align: right;
  display: flex;
  justify-content: right;
  align-items: center;
`;

export const Img = styled.img`
  aspect-ratio: 1;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  vertical-align: middle;
`;

export const RightCol = styled(Col)``;

export const FormCol = styled(Col)`
  margin-left: 24px;
`;

export const PagButton = styled(Button)`
  background-color: #15b6b8;
  --bs-btn-border-color: #15b6b8;
  --bs-btn-hover-bg: #fcb900;
  --bs-btn-hover-color: black;
  --bs-btn-disabled-bg: #8ebfc0;
  --bs-btn-disabled-border-color: #8ebfc0;
  --bs-btn-hover-border-color: #fcb900;
  --bs-btn-active-bg: #fcb900;
  --bs-btn-active-border-color: #fcb900;
`;

export const CustomSpinner = styled(Spinner)`
  color: #fcb900;
`;
