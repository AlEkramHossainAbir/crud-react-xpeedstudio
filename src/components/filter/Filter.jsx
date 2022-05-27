import React from "react";

const Filter = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <span>
      <input
        type="text"
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </span>
  );
};

export default Filter;
