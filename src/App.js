import { LinkContainer } from "react-router-bootstrap";
import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { NavItem } from "react-bootstrap";
import "./App.css";
import Routes from "./Routes";
import { AppContext } from "./libs/contextLib";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { onError } from "./libs/errorLib";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  const history = useHistory();
  const [showNavigation, setShowNavigation] = useState(false);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const currentPathname =
    history && history.location && history.location.pathname;
  const isHomePage = currentPathname === "/";

  useEffect(() => {
    onLoad();
    // eslint-disable-next-line
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== "No current user") {
        onError(e);
      }
    }

    setIsAuthenticating(false);
    console.log(isAuthenticating);
  }

  async function handleLogout() {
    await Auth.signOut();

    userHasAuthenticated(false);

    history.push("/login");
  }

  return (
    // Todo, implement Natitem for support (external link)
    // See discussion here, https://github.com/ReactTraining/react-router/issues/1147
    <React.Fragment>
      <nav className="app-navigation">
        <div>
          <h1 className="logo" onClick={() => history.push("/")}>
            Shhh
          </h1>
          <i
            className="fas fa-bars"
            onClick={() => setShowNavigation(!showNavigation)}
          />
          <ul className={showNavigation ? "is-open" : ""}>
            <LinkContainer to="/about">
              <NavItem>About</NavItem>
            </LinkContainer>
            <LinkContainer to="/contact">
              <NavItem>Contact</NavItem>
            </LinkContainer>
            <LinkContainer to="/pricing">
              <NavItem>Pricing</NavItem>
            </LinkContainer>
            {isAuthenticated ? (
              <NavItem onClick={handleLogout}>Logout</NavItem>
            ) : (
              <>
                <LinkContainer to="/signup">
                  <NavItem>Signup</NavItem>
                </LinkContainer>
                <LinkContainer to="/login">
                  <NavItem>Login</NavItem>
                </LinkContainer>
              </>
            )}
            <LinkContainer to="/" className="share-secret">
              <NavItem>Share a Secret</NavItem>
            </LinkContainer>
          </ul>
        </div>
      </nav>
      <div className={`app-page ${isHomePage ? "is-home" : ""}`}>
        {currentPathname === "/" && (
          <header className="masthead">
            <h1>
              Share confidential information securely with expiring links.
            </h1>
          </header>
        )}
        <div className="app-body">
          <ErrorBoundary>
            <AppContext.Provider
              value={{ isAuthenticated, userHasAuthenticated }}
            >
              <Routes />
            </AppContext.Provider>
          </ErrorBoundary>
        </div>
      </div>
      <footer>
        <p>
          By using Shhh, you agree to our <a href="terms">Terms</a> and{" "}
          <a href="privacy">Privacy Policy</a>.
        </p>
      </footer>
    </React.Fragment>
  );

  // return (
  //   !isAuthenticating && (
  //     <div className="App container">
  //       <Navbar fluid collapseOnSelect>
  //         <Navbar.Header>
  //           <Navbar.Brand>
  //             <Link to="/">Shhh</Link>
  //           </Navbar.Brand>
  //           <Navbar.Toggle />
  //         </Navbar.Header>
  //         <Navbar.Collapse>
  //           <Nav pullRight>
  //             {isAuthenticated ? (
  //               <NavItem onClick={handleLogout}>Logout</NavItem>
  //             ) : (
  //               <>
  //                 <LinkContainer to="/signup">
  //                   <NavItem>Signup</NavItem>
  //                 </LinkContainer>
  //                 <LinkContainer to="/login">
  //                   <NavItem>Login</NavItem>
  //                 </LinkContainer>
  //               </>
  //             )}
  //           </Nav>
  //         </Navbar.Collapse>
  //       </Navbar>
  //       <ErrorBoundary>
  //         <AppContext.Provider
  //           value={{ isAuthenticated, userHasAuthenticated }}
  //         >
  //           <Routes />
  //         </AppContext.Provider>
  //       </ErrorBoundary>
  //     </div>
  //   )
  // );
}
export default App;
