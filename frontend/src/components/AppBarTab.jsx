import React from "react";
import { Link } from "react-router-native";

import Text from "./Text";

const AppBarTab = ({ text, path, style }) => {
  return (
    <Link style={style} to={path} replace>
      <Text fontSize="subheading" color="primary">
        {text}
      </Text>
    </Link>
  );
};

export default AppBarTab;
