import React, { useEffect } from 'react';
//import { getBreadcrumbs } from 'react-router-breadcrumbs-hoc';
//import { useNavigate } from 'react-router-dom';
import routes, { rootType, leafType } from './routes'; // Certifique-se de importar suas rotas corretamente
import { BaseHeader } from '../components';
import { Route, Routes } from 'react-router-dom';
//import { useNavigate } from 'react-router-dom';

//type Breadcrumbs = { prevPath?: string; prevName?: string }[];

// const RenderRoute = (route: rootType | leafType, breadcrumbs: Breadcrumbs = []): JSX.Element => {
//   //const navigate = useNavigate();
//   //const isParentComponent = 'children' in route;
//   const path = `${breadcrumbs?.[breadcrumbs.length - 1]?.prevPath ?? ''}${route.path.startsWith('/') ? route.path.replace('/', '') : `/${route.path}`}`;
//   //const currentBreadcrumb = isParentComponent && !!route.name ? [...breadcrumbs, { prevPath: path, prevName: route?.name }] : breadcrumbs;

//   return (
//     <React.Fragment key={route.path}>
//       <BaseHeader
//         title="TESTE"
//         messageState={{ message: '', setMessage: () => { } }}
//         showState={{ show: false, setShow: () => { } }}
//       />
//       {getBreadcrumbs({ routes, location: { pathname: path } }).map((breadcrumb, index) => (
//         <span key={index}>{breadcrumb}</span>
//       ))}
//       {route.element}
//       <Footer />
//     </React.Fragment>
//   );
// };
const RenderRoute = (route: rootType | leafType): JSX.Element => {
  useEffect(()=>{
    console.log('route2',route);
    
  })
  return (
    <React.Fragment key={route.path}>
      
      <BaseHeader
        title="ONION SA"
        messageState={{ message: '', setMessage: () => { } }}
        showState={{ show: false, setShow: () => { } }}
      />
      {route.element}
      {/* <Footer /> */}
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
