import MainContainer from "./app/screens/MainContainer";
import { UserProvider } from "./userContext";

export default function App() {
  return (
    <UserProvider>
      <MainContainer />
    </UserProvider>
  );
}
