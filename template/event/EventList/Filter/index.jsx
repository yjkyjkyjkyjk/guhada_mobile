import PropTypes from 'prop-types';
import Select from 'react-select';
import { optionType } from './constants';

const Filter = ({ name, handleFilterChange }) => {
  const selectStyles = {
    container: () => ({
      position: 'relative',
      width: '100px',
    }),
    valueContainer: () => ({
      padding: 0,
    }),
    control: (provided) => ({
      ...provided,
      minHeight: 30,
      border: 'none',
      boxShadow: 0,
      color: '#333',
      fontSize: 13,
      fontWeight: 500,
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#333',
      fontSize: 13,
      fontWeight: '500',
    }),
    option: (provided, state) => ({
      ...provided,
      minHeight: 30,
      backgroundColor: state.isFocused ? '#f7f7f8' : '#fff',
      paddingLeft: 14,
      fontSize: 12,
      color: state.isSelected ? '#111' : '#111',
    }),
    menu: (provided, state) => ({
      ...provided,
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      transform: state.selectProps.menuIsOpen ? 'rotate(-180deg)' : '',
      padding: 0,
      color: '#111',
      fontSize: '12px',
    }),
    indicatorsContainer: () => ({
      padding: 0,
    }),
  };

  return (
    <Select
      styles={selectStyles}
      placeholder={`진행중 ${name}`}
      options={optionType[name]}
      onChange={handleFilterChange}
      isSearchable={false}
    />
  );
};

Filter.propTypes = {
  name: PropTypes.string,
  handleFilterChange: PropTypes.func,
};

export default Filter;
