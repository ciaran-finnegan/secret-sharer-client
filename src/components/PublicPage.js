import React, { useEffect, useState } from "react";
import { useAppContext } from "../libs/contextLib";

const publicPage = (Component = null, options = {}) => {
  return (props) => {
    const { history } = props;
    const { isAuthenticated } = useAppContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (!isAuthenticated) {
        setLoading(false);
      } else {
        history.push(options.pathAfterFailure || "/share");
      }
    }, [isAuthenticated, history]);

    if (loading) {
      return <div />;
    }

    return <Component {...props} />;
  };
};

export default publicPage;
