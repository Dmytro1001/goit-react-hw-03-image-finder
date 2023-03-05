import { PropTypes } from 'prop-types';
import { Component } from 'react';
import {
  Searchbar,
  SearchForm,
  SearchFormBtn,
  SearchFormInput,
} from './Searchbar.styles';
import { BsSearch } from 'react-icons/bs';
import { toast } from 'react-toastify';

export class HeaderSearchbar extends Component {
  state = {
    value: '',
  };

  handleChange = e => {
    this.setState({ value: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.value.trim() === '') {
      toast.error('Type something to find');
      return;
    }
    this.props.onSubmit(this.state.value);
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

HeaderSearchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
