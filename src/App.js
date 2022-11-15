import {BrowserRouter,Routes,Route} from "react-router-dom";
import {QueryClient,QueryClientProvider} from "@tanstack/react-query";
import {Toaster} from "react-hot-toast";
import StatusProvider from "./modules/hms/providers/StatusProvider";
import Member from "./modules/hms/pages/Member";
import AppLayout from "./modules/hms/Layouts/AppLayout";
import Claim from "./modules/hms/pages/Claim";
import Details from "./modules/hms/pages/Claim/details";


const queryClient = new QueryClient()

function App() {

  return (
      <QueryClientProvider client={queryClient}>
          <StatusProvider>
              <BrowserRouter>
                  <Routes>
                      <Route element={<AppLayout/>}>
                          <Route path={'/'} element={<Member/>}/>
                          <Route path={'/claim'} element={<Claim/>}/>
                          <Route path={'/claim/:id/details'} element={<Details/>}/>
                      </Route>
                  </Routes>
              </BrowserRouter>
              <Toaster
                  position="bottom-right"
              />
          </StatusProvider>
      </QueryClientProvider>

  );
}

export default App;
