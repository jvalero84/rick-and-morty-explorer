import { useParams, useNavigate, Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { TItemIdParam, TLocationDetail } from "../types/apitypes";
import { Row, Form } from "react-bootstrap";
import {
  CustomSpinner,
  Section,
  RightCol,
  FormCol,
  PagButton,
} from "../styles/DetailView.styles";
import { formatDate } from "date-fns";

const GET_LOCATION = gql`
  query getLocation($id: ID!) {
    location(id: $id) {
      id
      name
      type
      dimension
      residents {
        id
      }
      created
    }
  }
`;

export function LocationDetailPage() {
  const { id } = useParams<TItemIdParam>();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery<TLocationDetail, TItemIdParam>(
    GET_LOCATION,
    { variables: { id: id! } }
  );

  return (
    <div>
      {loading ? (
        <CustomSpinner animation="border" />
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
                  {data!.location.name}
                </h1>

                <div
                  className="offset-lg-1 col-lg-8 mb-2"
                  style={{ fontSize: "22px" }}
                >
                  <Row>
                    <Form.Label style={{ fontWeight: "bold", width: "20%" }}>
                      Type:
                    </Form.Label>
                    <FormCol>{data!.location.type}</FormCol>
                  </Row>
                  <Row>
                    <Form.Label style={{ fontWeight: "bold", width: "20%" }}>
                      Dimension:
                    </Form.Label>
                    <FormCol>{data!.location.dimension}</FormCol>
                  </Row>
                  <Row>
                    <Form.Label style={{ fontWeight: "bold", width: "20%" }}>
                      Residents:
                    </Form.Label>
                    <FormCol>
                      {data!.location.residents && (
                        <Link
                          to={`/characters`}
                          state={{
                            charFilter: data!.location.residents.map(
                              (item) => item.id
                            ),
                          }}
                        >
                          <span>Explore Residents</span>
                        </Link>
                      )}
                    </FormCol>
                  </Row>
                  <Row>
                    <Form.Label style={{ fontWeight: "bold", width: "20%" }}>
                      Created:
                    </Form.Label>
                    <FormCol>
                      {formatDate(data!.location.created, "MMMM dd, yyyy p")}
                    </FormCol>
                  </Row>
                </div>
              </RightCol>
            </Row>
          </Section>
          <Section fluid>
            <Row xs={1} style={{ width: "90%", marginLeft: "12%" }}>
              <RightCol>
                <PagButton
                  variant="primary"
                  onClick={() => navigate("/characters")}
                >
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
