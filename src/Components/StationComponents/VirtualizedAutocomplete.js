import React, { Component } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { List } from "react-virtualized";

const ListboxComponent = React.forwardRef(function ListboxComponent(
  props,
  ref
) {
  const { children, role, ...other } = props;
  const itemCount = Array.isArray(children) ? children.length : 0;
  const itemSize = 36;

  return (
    <div ref={ref}>
      <div {...other} style={{ display: "inline-block" }}>
        <List
          height={250}
          width={300}
          rowHeight={itemSize}
          overscanCount={5}
          rowCount={itemCount}
          rowRenderer={(props) => {
            return React.cloneElement(children[props.index], {
              style: props.style,
            });
          }}
          role={role}
        />
      </div>
    </div>
  );
});

class VirtualizedAutocomplete extends Component {
  state = {};
  render() {
    const {
      id,
      options,
      getOptionLabel,
      inputValue,
      onInputChange,
      getOptionSelected,
      onChange,
      renderInput,
    } = this.props;
    return (
      <Autocomplete
        id={id}
        style={{ width: 300 }}
        disableListWrap
        autoHighlight
        ListboxComponent={ListboxComponent}
        options={options}
        getOptionLabel={getOptionLabel}
        inputValue={inputValue}
        onInputChange={onInputChange}
        getOptionSelected={getOptionSelected}
        onChange={onChange}
        renderInput={renderInput}
      />
    );
  }
}

export default VirtualizedAutocomplete;
