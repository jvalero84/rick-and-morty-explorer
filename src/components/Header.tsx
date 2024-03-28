import { ImgHTMLAttributes } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import styled from "styled-components";

interface ImgClickable extends React.HTMLAttributes<HTMLImageElement> {
  onClick?: ImgHTMLAttributes<HTMLImageElement>["onClick"];
}

export function Header() {
  const navigate = useNavigate();

  return (
    <header>
      <Div>
        <Img
          loading="lazy"
          src="/img/r&m-logo.png"
          onClick={() => navigate("/")}
        />
        <Div2>
          <Link to="/characters">
            <h1>Characters</h1>
          </Link>
          <Link to="/episodes">
            <h1>Episodes</h1>
          </Link>
          <Link to="/locations">
            <h1>Locations</h1>
          </Link>
        </Div2>
      </Div>
    </header>
  );
}

const Div = styled.div`
  justify-content: space-between;
  background-color: lightgoldenrodyellow;
  display: flex;
  gap: 20px;
  font-size: 16px;
  color: #fff;
  font-weight: 400;
  white-space: nowrap;
  text-transform: uppercase;
  padding: 16px;
  font-family: Roboto Condensed;
`;

const Img = styled.img<ImgClickable>`
  //aspect-ratio: 2.5;
  object-fit: auto;
  object-position: center;
  width: 25%;
  max-width: 100%;
  cursor: pointer;
`;

const Div2 = styled.div`
  display: flex;
  gap: 8px;
  margin: auto 0;
  padding: 8px;
`;
