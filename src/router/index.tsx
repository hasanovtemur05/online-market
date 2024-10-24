import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
  } from "react-router-dom";
  
  import App from "../App";
  import { SignIn } from "@modules";

  const Index = () => {
    const router = createBrowserRouter(
      createRoutesFromElements(
        <Route path="/" element={<App />}>
          <Route index element={<SignIn />} />
          {/* <Route path="admin-layout" element={<AdminLayout />} >
              <Route index element={<Category />} />
          </Route> */}
          {/* <Route path="*" element={<Notfound/>} /> */}
        </Route>
      )
    );
  
    return <RouterProvider router={router} />;
  };
  
  export default Index;
  