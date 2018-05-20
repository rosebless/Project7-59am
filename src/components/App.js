import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { I18nextProvider } from "react-i18next";
import Menu from './Menu';
import ManageEmp from './ManageEmp';
import i18next from '../configs/i18next';

class App extends Component {
  state = {
    lng: 'en',
  };

  toLang = lng => {
    this.setState({
      lng,
    });
  }
  render() {
    const { lng } = this.state;
    return (
      <MuiThemeProvider>
        <BrowserRouter>
          <I18nextProvider i18n={i18next}>
            <div>
              <Menu
                setLang={this.toLang}
                lng={lng}
              />
              <ManageEmp
                lng={lng}
              />
            </div>
          </I18nextProvider>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}
export default App;
