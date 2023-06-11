import { createContext, useState } from "react";
import PropTypes from "prop-types";

const CookbookContext = createContext([]);
const { Provider } = CookbookContext;

const CookbookProvider = ({ children, value = [] }) => {
  const [cookbook, setCookbook] = useState(value);

  return <Provider value={{ cookbook, setCookbook }}>{children}</Provider>;
};

CookbookProvider.propTypes = {
  children: PropTypes.node,
  value: PropTypes.array,
};

export { CookbookContext, CookbookProvider };
