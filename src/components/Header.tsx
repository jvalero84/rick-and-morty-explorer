import { ImgHTMLAttributes } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import styled from "styled-components";

interface ImgClickable extends React.HTMLAttributes<HTMLImageElement> {
  onClick?: ImgHTMLAttributes<HTMLImageElement>["onClick"];
}

export function Header() {
  const navigate = useNavigate();

  const location = useLocation();
  const { pathname } = location;

  return (
    <header>
      <DivContainer>
        <Div>
          <Img
            loading="lazy"
            src="/img/Rick_and_Morty_logo.svg"
            onClick={() => navigate("/")}
          />
        </Div>
        <Div2>
          <HeaderLink
            className="btn  btn-lg"
            style={{
              borderColor: pathname.includes("characters")
                ? "#15b6b8"
                : "#fcb900",
              borderWidth: pathname.includes("characters") ? "medium" : "",
            }}
            role="button"
            to="/characters"
          >
            Characters
          </HeaderLink>
          <HeaderLink
            role="button"
            className="btn  btn-lg"
            style={{
              borderColor: pathname.includes("episodes")
                ? "#15b6b8"
                : "#fcb900",
              borderWidth: pathname.includes("episodes") ? "medium" : "",
            }}
            to="/episodes"
          >
            Episodes
          </HeaderLink>
          <HeaderLink
            role="button"
            className="btn  btn-lg"
            style={{
              borderColor: pathname.includes("locations")
                ? "#15b6b8"
                : "#fcb900",
              borderWidth: pathname.includes("locations") ? "medium" : "",
            }}
            to="/locations"
          >
            Locations
          </HeaderLink>
        </Div2>
      </DivContainer>
    </header>
  );
}

const DivContainer = styled.div`
  justify-content: space-between;
  /* background-color: #fcb900; */
  background-color: white;
  display: flex;
  gap: 20px;
  font-size: 16px;
  color: #fff;
  font-weight: 400;
  white-space: nowrap;
  text-transform: uppercase;
  padding: 16px;
  width: 85%;
  font-family: Roboto Condensed;
`;

const Img = styled.img<ImgClickable>`
  //aspect-ratio: 2.5;
  object-fit: auto;
  width: 100%;
  max-width: 100%;
  cursor: pointer;
`;

const Div = styled.div`
  display: flex;
  width: 25%;
  //gap: 8px;
  margin-left: 50px;
  padding-left: 60px;
  align-content: end;
`;

const Div2 = styled.div`
  display: flex;
  width: 60%;
  justify-content: space-between;
  margin-left: 50px;
  align-items: end;
`;

const HeaderLink = styled(Link)`
  background-color: #fcb900;
  --bs-btn-color: white;
  //--bs-btn-border-color: none;
  --bs-btn-hover-bg: #15b6b8;
  --bs-btn-hover-color: black;
`;
