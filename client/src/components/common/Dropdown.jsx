import React from "react";

const Dropdown = (props) => {
  const { items, selectedItem, onItemSelect } = props;
  return (
    <ul>
      {items.map((item) => (
        <li onClick={() => onItemSelect(item)} key={item._id}>
          {item.name} {item === selectedItem ? "selected" : ""}
        </li>
      ))}
    </ul>
  );
};

export default Dropdown;
