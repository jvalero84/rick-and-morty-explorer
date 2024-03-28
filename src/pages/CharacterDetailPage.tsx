import { useParams, Link, useNavigate } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { TItemIdParam, TCharacterDetail } from "../types/apitypes";
import styled from "styled-components";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

const GET_CHARACTERS = gql`
  query getCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      origin {
        id
        name
      }
      location {
        id
        name
      }
      image
      episode {
        id
        name
      }
      created
    }
  }
`;

export function CharacterDetailPage() {
  const { id } = useParams<TItemIdParam>();

  const navigate = useNavigate();

  const { loading, error, data } = useQuery<TCharacterDetail, TItemIdParam>(
    GET_CHARACTERS,
    {
      variables: { id: id! },
    }
  );
  console.log(data);

  return (
    <div>
      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <Section fluid>
          {/* <div className="row justify-content-center"> */}
          <Row
            // className="justify-content-center"
            sm={1}
            xs={2}
            md={2}
            lg={2}
            style={{ width: "90%", margin: "0 auto" }}
          >
            <LeftCol>
              <Img loading="lazy" src={data!.character.image} />
            </LeftCol>

            <RightCol>
              {/* <div className="inner py-5 m-auto row"> */}
              <h1 className="offset-lg-1 col-lg-8 mb-4">
                {data!.character.name}
              </h1>

              <div
                className="offset-lg-1 col-lg-8 mb-2"
                style={{ fontSize: "22px" }}
              >
                <Row>
                  <Form.Label style={{ fontWeight: "bold", width: "20%" }}>
                    Species:
                  </Form.Label>
                  <FormCol>{data!.character.species}</FormCol>
                </Row>
                <Row>
                  <Form.Label style={{ fontWeight: "bold", width: "20%" }}>
                    Type:
                  </Form.Label>
                  <FormCol>{data!.character.type}</FormCol>
                </Row>
                <Row>
                  <Form.Label style={{ fontWeight: "bold", width: "20%" }}>
                    Status:
                  </Form.Label>
                  <FormCol>{data!.character.status}</FormCol>
                </Row>
                <Row>
                  <Form.Label style={{ fontWeight: "bold", width: "20%" }}>
                    Gender:
                  </Form.Label>
                  <FormCol>{data!.character.gender}</FormCol>
                </Row>
                <Row>
                  <Form.Label style={{ fontWeight: "bold", width: "20%" }}>
                    Episodes:
                  </Form.Label>
                  <FormCol>
                    {data!.character.episode && (
                      <Link
                        to={`/episodes`}
                        state={{
                          epFilter: data!.character.episode.map(
                            (item) => item.id
                          ),
                        }}
                      >
                        <span>Explore Episodes</span>
                      </Link>
                    )}
                  </FormCol>
                </Row>
                <Row>
                  <Form.Label style={{ fontWeight: "bold", width: "20%" }}>
                    Origin:
                  </Form.Label>
                  <FormCol>{data!.character.origin.name}</FormCol>
                </Row>
                <Row>
                  <Form.Label style={{ fontWeight: "bold", width: "20%" }}>
                    Location:
                  </Form.Label>
                  <FormCol>{data!.character.location.name}</FormCol>
                </Row>
                <Row>
                  <Form.Label style={{ fontWeight: "bold", width: "20%" }}>
                    Created:
                  </Form.Label>
                  <FormCol>{data!.character.created}</FormCol>
                </Row>
              </div>

              {/* <div className="offset-lg-2 col-lg-8 mb-4 mt-5">
                <a href="#" className="d-inline-block text-info">
                  Forgot you password ?
                </a>
                <br />
                <a href="#" className="d-inline-block text-info mt-4">
                  Doesn't have an account ? Register now.
                </a>
              </div> */}
              {/* </div> */}
            </RightCol>
          </Row>

          {/* </div> */}
        </Section>
      )}
      <Section style={{ justifyContent: "flex-start" }}>
        <Row xs={1}>
          <LeftCol>
            <Button variant="primary" onClick={() => navigate("/characters")}>
              Back
            </Button>
          </LeftCol>
        </Row>
      </Section>
    </div>
  );
}

const Section = styled(Container)`
  width: 100%;
  display: flex;
  padding-top: 20px;
  padding-bottom: 20px;
  /* padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  position: relative; */
`;

const LeftCol = styled(Col)`
  width: 30%;
  text-align: right;
  display: flex;
  justify-content: right;
  align-items: center;
  /* min-height: calc(100vh - 65px);
  @media (max-width: 991px) {
    min-height: 15rem;
  } */
`;

const Img = styled.img`
  aspect-ratio: 1;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  vertical-align: middle;
  //width: 350px;
  //height: 350px;

  /* position: absolute;
  top: 0;
  left: 0;
  width: 30%;
  bottom: 0;
  background: url("https://fakeimg.pl/840x740/?text=HelloWorld&font=lobster");
  background-size: cover;
  background-position: center center; */
`;

const RightCol = styled(Col)`
  //display: flex;
  //flex-wrap: wrap;
  //width: 70%;
`;

const FormCol = styled(Col)`
  margin-left: 24px;
`;
