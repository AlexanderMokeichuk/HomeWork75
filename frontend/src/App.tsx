import FormOfEncryption from "./components/FormOfEncryption/FormOfEncryption";
import {Grid} from "@mui/material";

function App() {

  return (
    <Grid container justifyContent={"center"} sx={{mt: 5}}>
      <FormOfEncryption />
    </Grid>
  );
}

export default App;
