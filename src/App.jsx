import { Container, Typography } from "@mui/material";
import { CookbookProvider } from "./context/cookbookContext"; // Import the CookbookProvider from your context file
import Cookbook from "./components/cookbook/cookbook";
import CookbookActions from "./components/cookbookActions/cookbookActions";
import "./App.css";
import cookbookMockup from "./utils/cookbookMockup";

const styles = {
  verticalContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  centerVerticalContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    heigth: "90vh",
    maxHeight: "90vh",
    height: "fit-content",
    margin: 0,
  },
};

function App() {
  return (
    <CookbookProvider value={cookbookMockup}>
      <Container
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr",
          width: "100%",
        }}
      >
        <Container sx={styles.verticalContainer}>
          <CookbookActions />
        </Container>
        <Container sx={styles.centerVerticalContainer}>
          <Typography variant='h4' component='h1' gutterBottom>
            Receitas
          </Typography>
          <Cookbook />
        </Container>
      </Container>
    </CookbookProvider>
  );
}

export default App;
