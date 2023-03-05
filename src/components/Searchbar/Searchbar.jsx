import { PropTypes } from 'prop-types';
import { Component } from 'react';
import {
  Searchbar,
  SearchForm,
  SearchFormBtn,
  SearchFormInput,
} from './Searchbar.styles';
import { BsSearch } from 'react-icons/bs';

export class HeaderSearchbar extends Component {
  state = {
    value: '',
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSearch(this.state.value);
    this.setState({ value: '' });
  };

  render() {
    return (
      <Searchbar>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormBtn type="submit" aria-label="Search">
            <BsSearch size={20} />
          </SearchFormBtn>

          <SearchFormInput
            type="text"
            autoComplete="off"
            name="value"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </SearchForm>
      </Searchbar>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
