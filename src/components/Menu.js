import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { I18n } from 'react-i18next';
import Drawer from 'material-ui/Drawer';
import AccountBoxIcon from 'material-ui/svg-icons/action/account-box';
import LanguageIcon from 'material-ui/svg-icons/action/language';
import Divider from 'material-ui/Divider';
import List from 'material-ui/List';
import ListItem from 'material-ui/List/ListItem';
import './styles/Menu.css';


const Menu = ({ history, lng, setLang }) => {
  const menuList = [
    {
      key: 'manageEmp',
      titleKey: 'menu.manageEmp',
      IconComponent: AccountBoxIcon,
      subMenus: [
        {
          key: 'searchEmployee',
          titleKey: 'menu.searchEmp',
          action: () => { history.push('/'); },
        },
        {
          key: 'addEmployee',
          titleKey: 'menu.addEmp',
          action: () => { history.push('/add-employee'); },
        },
      ],
    },
    {
      key: 'language',
      titleKey: 'menu.language',
      IconComponent: LanguageIcon,
      subMenus: [
        {
          key: 'english',
          titleKey: 'menu.english',
          action: () => { setLang('en'); },
        },
        {
          key: 'thai',
          titleKey: 'menu.thai',
          action: () => { setLang('th'); },
        },
      ],
    },
  ];

  return (
    <div>
      <I18n>
        {t => (
          <Drawer
            open
            width={256}
          >
            <List className="menu-list">
              <div className="menu-block-title">
                <h1 className="menu-title">
                  {t('menu.title', { lng })}
                </h1>
              </div>
              {menuList.map(menu => (
                <div key={menu.key}> 
                  <ListItem
                    primaryTogglesNestedList
                    primaryText={t(menu.titleKey, { lng })}
                    leftIcon={<menu.IconComponent color="#0978ad" />}
                    nestedItems={menu.subMenus.map(subMenu => (
                      <ListItem
                        key={subMenu.key}
                        primaryText={t(subMenu.titleKey, { lng })}
                        onClick={subMenu.action}
                      />
                    )) }
                  />
                  <Divider />
                </div>
              ))}
            </List>
          </Drawer>
        )}
      </I18n>
    </div>
  );
};

Menu.propTypes = {
  lnt: PropTypes.oneOf(['en', 'th']),
  setLang: PropTypes.func,
};

Menu.defaultProps = {
  lnt: 'en',
  setLang: () => {},
};

export default withRouter(Menu);
