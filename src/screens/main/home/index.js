import React from 'react';
import {useAccountType} from '../../../hooks';
import UserHome from './userHome';
import ShopOwnerHome from './shopOwnerHome';
import DriverHome from './driverHome';

const Home = ({navigation}) => {
  const {isCustomer, isGroceryOwner, isDriver} = useAccountType();

  if (isCustomer) return <UserHome />;
  else if (isGroceryOwner) return <ShopOwnerHome />;
  else if (isDriver) return <DriverHome />;
};

export default Home;
