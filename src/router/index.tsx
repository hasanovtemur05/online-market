import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
  } from "react-router-dom";
  
  import App from "../App";
  import { Register, SignIn, Product, UserLayout, Contract, Exchange } from "@modules";

  const Index = () => {
    const router = createBrowserRouter(
      createRoutesFromElements(
        <Route path="/" element={<App />}>
          <Route index element={<SignIn />} />
          <Route path="register" element={<Register />} />
          <Route path="user-layout" element={<UserLayout />} >
              <Route index element={<Product />} />
              <Route path="contract" element={<Contract />} />
              <Route path="exchange" element={<Exchange />} />

          </Route> 
         {/* <Route path="*" element={<Notfound/>}/> */}
        </Route>
      )
    );
  
    return <RouterProvider router={router} />;
  };
  
  export default Index;
  