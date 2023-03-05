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

  // handleChange = ({ target: { value } }) => {
  //   this.setState({ value });
  // };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  hanleSubmit = event => {
    event.preventDefault();
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
            name="value"
            autoComplete="off"
            autoFocus
            value={this.state.value}
            onChange={this.handleChange}
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Searchbar>
    );
  }
}

HeaderSearchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
