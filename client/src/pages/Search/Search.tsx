import React from "react";
import { useLocation } from "react-router-dom";
import TabInterface from "../../components/TabInterface/TabInterface";

export default function Search() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("q") || "";
  return (
    <div>
      <TabInterface query={query} />
    </div>
  );
}
