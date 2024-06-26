import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import useSelector from "../store/selector";
import { BRANDNAME, LOGIN_FORM, atomNameConst } from "../utilities/constants";

function Header(props) {
  const { setModalFor, setShowModal } = props;
  const { getRecoilVal, setRecoilVal } = useSelector();
  const loginData = getRecoilVal(atomNameConst.LOGINDETAIL)?.user;
  const brandDetail = getRecoilVal(atomNameConst.LOGINDETAIL)?.brandDetail;

  const handleLogout = () => {
    try {
      setRecoilVal(atomNameConst.LOGINDETAIL, null);
      setShowModal(true);
      setModalFor(LOGIN_FORM);
    } catch (error) {}
  };
  return (
    <>
      {["md"].map((expand) => (
        <Navbar
          bg="primary"
          data-bs-theme="dark"
          key={expand}
          expand={expand}
          className="bg-body-tertiary mb-3 sticky-top "
        >
          <Container fluid>
            <Navbar.Brand href="#">{brandDetail?.name}</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  {brandDetail?.name}
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  {loginData && (
                    <>
                      <Navbar.Text className="mx-2">
                        {`${loginData?.name} - ${loginData?.role}`}
                      </Navbar.Text>
                      <Nav.Link>
                        <FontAwesomeIcon
                          icon={faRightFromBracket}
                          size="2x"
                          onClick={handleLogout}
                        />
                      </Nav.Link>
                    </>
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default Header;
