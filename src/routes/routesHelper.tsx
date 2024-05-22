import React, { useEffect } from 'react';
import routes, { rootType, leafType } from './routes'; 
import { BaseHeader } from '../components';
import { Route, Routes } from 'react-router-dom';

const RenderRoute = (route: rootType | leafType): JSX.Element => {
  useEffect(()=>{
    console.log('route2',route);
    
  })
  return (
    <React.Fragment key={route.path}>
      
      <BaseHeader
        title="ONION S.A."
        messageState={{ message: '', setMessage: () => { } }}
        showState={{ show: false, setShow: () => { } }}
      />
      {route.element}
    </React.Fragment>
  );
};


function RoutesHelper(): JSX.Element {
  useEffect(()=>{
    console.log('routes',routes);
    
  })
  return (
    <Routes> 
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={RenderRoute (route)} />
      ))}
    </Routes>
  );
}

export default RoutesHelper;
