import React from 'react';
import { Link } from 'react-router'

import settings from 'lib/settings'
import messages from 'src/locale'
import ProductCategoryHead from 'modules/product-categories/head/index'
import ProductsHead from 'modules/products/head/index'
import Drawer from './drawer'

import FontIcon from 'material-ui/FontIcon';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import LinearProgress from 'material-ui/LinearProgress';

export default class AppBarTop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});
  handleClose = () => this.setState({open: false});

  render() {
    const { isLoading, category, selectedProducts } = this.props;
    const location = this.props.location.pathname;
    const menu = settings.admin.menu;

    let title = 'Dashboard';
    let leftButton = <IconButton onTouchTap={this.handleToggle}><FontIcon className="material-icons">menu</FontIcon></IconButton>;
    let rightElements = null;
    {/* <IconButton><FontIcon color="#fff" className="material-icons">notifications</FontIcon></IconButton> */}

    if(location === '/admin/products'){
      title = messages.products.title;
      let selectedCount = selectedProducts.length;

      if(category){
        title = category.name;
      }

      if(selectedCount > 0) {
        title += ` (${selectedCount})`;
      }

      rightElements = <ProductsHead />
    }
    else if(location.startsWith('/admin/product/')){
      title = title = messages.products.titleEdit;
      leftButton = <IconButton><Link to="/admin/products"><FontIcon color="#fff" className="material-icons">arrow_back</FontIcon></Link></IconButton>
      rightElements = null;
    }
    else if(location === '/admin/products/categories'){
      title = messages.productCategories.title;
      if(category){
        title = category.name;
        rightElements = <ProductCategoryHead />
      }
    }

    return (
      <div>
        {isLoading &&
          <LinearProgress mode="indeterminate" color="#fff" style={{ backgroundColor: 'transparent', borderRadius: 0, height: 2, zIndex: 1101, top: 0, position: 'absolute'  }} />
        }
        <AppBar
          style={{ paddingLeft: 28, paddingRight: 28 }}
          titleStyle={{ fontSize: 18 }}
          title={title}
          iconElementLeft={leftButton}
          iconElementRight={rightElements}
        />

        <Drawer open={this.state.open} handleClose={(open) => this.handleClose()} menu={menu} title={<span>Menu</span>} currentUrl={location} />
      </div>
    );
  }
}
