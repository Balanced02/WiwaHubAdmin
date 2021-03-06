import React from 'react';
import Loadable from 'react-loadable'
import ReactLoading from 'react-loading'

import DefaultLayout from './containers/DefaultLayout';

function Loading() {
  return <ReactLoading type='bubbles' color='#20a8d8' style={{flex:1}} />
}

const ProductList = Loadable({
  loader: () => import('./views/Base/ProductList'),
  loading: Loading,
});

const Dashboard = Loadable({
  loader: () => import('./views/Dashboard'),
  loading: Loading,
});

const NewProduct = Loadable({
  loader: () => import('./views/Base/NewProduct'),
  loading: Loading
})

const MyAds = Loadable({
  loader: () => import('./views/Base/MyAds'),
  loading: Loading
})


const routes = [
  { path: '/app', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/app/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/app/productList', name: 'Product List', component: ProductList },
  { path: '/app/addProduct', name: 'New Product', component: NewProduct },
  { path: '/app/myAds', name: 'New Product', component: MyAds },
];

export default routes;
