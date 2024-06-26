import { useParams, Link, useNavigate } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { TItemIdParam, TCharacterDetail } from "../types/apitypes";
import { Row, Form } from "react-bootstrap";
import {
  CustomSpinner,
  Section,
  LeftCol,
  Img,
  RightCol,
  FormCol,
  PagButton,
} from "../styles/DetailView.styles";
import { formatDate } from "date-fns";

const GET_CHARACTER = gql`
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

const GET_CHARACTERS_LIST_FILTERED = gql`
  query getCharactersFiltered($ids: [ID!]!) {
    charactersByIds(ids: $ids) {
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
    GET_CHARACTER,
    {
      variables: { id: id! },
    }
  );
  console.log(data);

  return (
    <div>
      {loading ? (
        <div style={{ width: "90%", marginLeft: "12%" }}>
          <CustomSpinner animation="border" />
        </div>
      ) : (
        <div>
          <Section fluid>
            <Row
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
                    <FormCol>
                      {formatDate(data!.character.created, "MMMM dd, yyyy p")}
                    </FormCol>
                  </Row>
                </div>
              </RightCol>
            </Row>
          </Section>
          <Section fluid>
            <Row xs={1} style={{ width: "90%", marginLeft: "12%" }}>
              <RightCol>
                <PagButton onClick={() => navigate("/characters")}>
                  Back
                </PagButton>
              </RightCol>
            </Row>
          </Section>
        </div>
      )}
    </div>
  );
}
