import RoutesWrapper from "./routes";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <AlertProvider>
      <ToastContainer />
      <RoutesWrapper />
    </AlertProvider>
  );
}

export default App;
