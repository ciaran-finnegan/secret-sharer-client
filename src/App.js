import { LinkContainer } from "react-router-bootstrap";
import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { NavItem } from "react-bootstrap";
import "./App.css";
import Routes from "./Routes";
import { AppContext } from "./libs/contextLib";
import { API, Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { onError } from "./libs/errorLib";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  const history = useHistory();
  const [showNavigation, setShowNavigation] = useState(false);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState(9999);
  const [user, setUser] = useState(null);
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
      const authenticatedUser = await Auth.currentAuthenticatedUser();

      setUser(authenticatedUser);
      userHasAuthenticated(true);

      if (authenticatedUser) {
        API.post("secret-sharer", "/getSubscriptionStatus", {
          body: {},
        })
          .then((response) => {
            if (response) {
              setSubscriptionStatus(response);
            }
          })
          .catch((error) => {
            console.log(
              `DEBUG: Home.js Error calling /getSubscriptionStatus API`
            );
            console.log(error);
            onError(error);
          });
      }
    } catch (e) {
      if (e !== "No current user") {
        console.log(
          `DEBUG:: App.js No current user, won't call /getSubscriptionStatus: ${e}`
        );
        // onError(e);
      }
    }

    setIsAuthenticating(false);
    console.log(isAuthenticating);
  }

  async function handleLogout() {
    await Auth.signOut();

    setUser(null);
    userHasAuthenticated(false);

    history.push("/login");
  }

  return (
    // Todo, implement Natitem for support (external link)
    // See discussion here, https://github.com/ReactTraining/react-router/issues/1147
    <React.Fragment>
      <nav className="app-navigation">
        <div>
          <div className="logo" onClick={() => history.push("/")}>
            <img src="/vanish-logo.svg" alt="Vanish" />
          </div>
          <i
            className="fas fa-bars"
            onClick={() => setShowNavigation(!showNavigation)}
          />
          <ul className={showNavigation ? "is-open" : ""}>
            {isAuthenticated ? (
              <>
                <LinkContainer to="/settings">
                  <NavItem>Settings</NavItem>
                </LinkContainer>
                <NavItem onClick={handleLogout}>Logout</NavItem>
              </>
            ) : (
              <>
                <LinkContainer to="/about">
                  <NavItem>About</NavItem>
                </LinkContainer>
                <LinkContainer to="/contact">
                  <NavItem>Contact</NavItem>
                </LinkContainer>
                <LinkContainer to="/pricing">
                  <NavItem>Pricing</NavItem>
                </LinkContainer>
                <LinkContainer to="/signup">
                  <NavItem>Signup</NavItem>
                </LinkContainer>
                <LinkContainer to="/login">
                  <NavItem>Login</NavItem>
                </LinkContainer>
              </>
            )}
            <LinkContainer to="/share" className="share-secret">
              <NavItem>Share a Secret</NavItem>
            </LinkContainer>
          </ul>
        </div>
      </nav>
      <div className={`app-page ${isHomePage ? "is-home" : ""}`}>
        {/* {currentPathname === "/" && (
          <header className="masthead">
            <h1>
              Share confidential information securely with expiring links.
            </h1>
          </header>
        )} */}
        <ErrorBoundary>
          <AppContext.Provider
            value={{
              subscriptionStatus,
              isAuthenticated,
              userHasAuthenticated,
              setUser,
              user,
            }}
          >
            <Routes />
          </AppContext.Provider>
        </ErrorBoundary>
      </div>
      <footer>
        <p>
          By using Vanish, you agree to our <a href="terms">Terms</a> and{" "}
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
  //             <Link to="/">Vanish</Link>
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
