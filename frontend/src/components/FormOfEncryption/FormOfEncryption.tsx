import React, {FormEvent, useState} from "react";
import {
  Card,
  CardContent,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import axiosApi from "../../axiosApi";
import {FormState} from "../../types";

const defaultState: FormState = {
  encode: "",
  password: "",
  decode: "",
};

const FormOfEncryption: React.FC = () => {
  const [formState, setFormState] = useState(defaultState);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const changeState = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  let rout = "";
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (rout !== "") {
      try {
        const {data: response} = await axiosApi.post<FormState | null>(`/${rout}`, formState);

        if (response) {
          setFormState(response);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <form onSubmit={onSubmit} style={{width: 400}}>
      <Card>
        <CardContent>
          <TextField
            name={"encode"}
            type={"text"}
            value={formState.encode}
            onChange={changeState}
            placeholder={"Encode"}
            multiline
            minRows={3}
            fullWidth={true}
          />
        </CardContent>
      </Card>
      <Grid container direction={"row"} alignItems={"center"} gap={2}>
        <Grid>
          <FormControl sx={{ m: 1}} fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              name={"password"}
              value={formState.password}
              onChange={changeState}
              type={showPassword ? 'text' : 'password'}
              required
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </Grid>
        <Grid>
          <IconButton
            type={"submit"}
            onClick={() => rout = "decode"}
          >
            <KeyboardArrowUpIcon />
          </IconButton>
          <IconButton
            type={"submit"}
            onClick={() => rout = "encode"}

          >
            <KeyboardArrowDownIcon />
          </IconButton>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <TextField
            name={"decode"}
            type={"text"}
            placeholder={"Decode"}
            value={formState.decode}
            onChange={changeState}
            multiline
            minRows={3}
            fullWidth={true}
          />
        </CardContent>
      </Card>
    </form>
  );
};

export default FormOfEncryption;