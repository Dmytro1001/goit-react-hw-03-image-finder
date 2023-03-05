import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { HeaderSearchbar } from './Searchbar/Searchbar';

export class App extends Component {
  state = {
    textSearch: 'wave',
  };

  handleSubmit = textSearch => {
    this.setState({ textSearch });
  };

  render() {
    return (
      <div className="container">
        <HeaderSearchbar onSearch={this.handleSubmit} />
        <ImageGallery value={this.state.textSearch} />
      </div>
    );
  }
}
