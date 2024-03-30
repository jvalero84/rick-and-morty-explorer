import { useParams, useNavigate, Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { TItemIdParam, TEpisodeDetail } from "../types/apitypes";
import { Row, Form } from "react-bootstrap";
import {
  CustomSpinner,
  Section,
  LeftCol,
  RightCol,
  FormCol,
  PagButton,
} from "../styles/DetailView.styles";
import { formatDate } from "date-fns";

const GET_EPISODE = gql`
  query getEpisode($id: ID!) {
    episode(id: $id) {
      id
      name
      air_date
      episode
      characters {
        id
      }
      created
    }
  }
`;

export function EpisodeDetailPage() {
  const { id } = useParams<TItemIdParam>();

  const navigate = useNavigate();

  const { loading, error, data } = useQuery<TEpisodeDetail, TItemIdParam>(
    GET_EPISODE,
    { variables: { id: id! } }
  );

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
              xs={1}
              md={1}
              lg={1}
              style={{ width: "90%", margin: "0 auto" }}
            >
              <RightCol>
                <h1 className="offset-lg-1 col-lg-8 mb-4">
                  {data!.episode.name}
                </h1>

                <div
                  className="offset-lg-1 col-lg-8 mb-2"
                  style={{ fontSize: "22px" }}
                >
                  <Row>
                    <Form.Label style={{ fontWeight: "bold", width: "20%" }}>
                      Code:
                    </Form.Label>
                    <FormCol>{data!.episode.episode}</FormCol>
                  </Row>
                  <Row>
                    <Form.Label style={{ fontWeight: "bold", width: "20%" }}>
                      Air date:
                    </Form.Label>
                    <FormCol>{data!.episode.air_date}</FormCol>
                  </Row>
                  <Row>
                    <Form.Label style={{ fontWeight: "bold", width: "20%" }}>
                      Characters:
                    </Form.Label>
                    <FormCol>
                      {data!.episode.characters && (
                        <Link
                          to={`/characters`}
                          state={{
                            charFilter: data!.episode.characters.map(
                              (item) => item.id
                            ),
                          }}
                        >
                          <span>Explore Characters</span>
                        </Link>
                      )}
                    </FormCol>
                  </Row>
                  <Row>
                    <Form.Label style={{ fontWeight: "bold", width: "20%" }}>
                      Created:
                    </Form.Label>
                    <FormCol>
                      {formatDate(data!.episode.created, "MMMM dd, yyyy p")}
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
