import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React from "react";

const CouponFields = ({
  values,
  error,
  handleChange,
  handleSubmit,
  status,
}) => {
  return (
    <div>
      {" "}
      <Box
        className='create-2 a'
        sx={{ marginBottom: { md: "0px", xs: "0px" } }}
      >
        <TextField
          id='outlined-required'
          label='Coupon Name'
          className='title'
          value={values.couponname}
          onChange={handleChange}
          name='couponname'
          helperText={error?.couponname}
          error={!!error?.couponname}
          sx={{ width: { md: "400px", xs: "100%" } }}
        />
      </Box>
      <br></br>
      <Box
        className='create-2 a'
        sx={{ marginBottom: { md: "-12px", xs: "0px" } }}
      >
        <TextField
          id='outlined-required'
          className='Maximum price'
          label='Maximum Price'
          type='number'
          InputProps={{
            endAdornment: <InputAdornment position='start'>$</InputAdornment>,
          }}
          placeholder='00'
          InputLabelProps={{
            shrink: true,
          }}
          value={values.maxprice}
          onChange={handleChange}
          name='maxprice'
          helperText={error?.maxprice}
          error={!!error?.maxprice}
          sx={{ width: { md: "400px", xs: "100%" } }}
        />
      </Box>
      <br></br>
      <Box
        className='create-2 a'
        sx={{ marginBottom: { md: "-12px", xs: "0px" } }}
      >
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            className='discountper'
            name='discountper'
            sx={{
              width: "399px",
              color: "#888",
              // background: "#f7f6f6",
              cursor: "pointer",
              height: "50px",
              marginLeft: "-7px",
              outline: "none",
            }}
            value={values.discountper}
            onChange={handleChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value=''>Discount Percentage</MenuItem>

            <MenuItem value={"10%"}>10%</MenuItem>
            <MenuItem value={"20%"}>20%</MenuItem>
            <MenuItem value={"30%"}>30%</MenuItem>
            <MenuItem value={"40%"}>40%</MenuItem>
            <MenuItem value={"50%"}>50%</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <br></br>
      <Box sx={{}}>
        {" "}
        <Typography
          className='description'
          sx={{
            fontSize: "15px",
            fontWeight: "500",
            color: "rgb(2,2,2,0.65)",
          }}
        >
          Description
        </Typography>
        <Box
          className='create-2 a'
          sx={{ marginBottom: { md: "-12px", xs: "0px" } }}
        >
          <TextareaAutosize
            maxRows={4}
            maxcolumns={4}
            className='textArea'
            label='description'
            aria-label='maximum height'
            value={values?.description}
            name='description'
            helperText={error?.description}
            error={!!error?.description}
            onChange={handleChange}
            style={{
              maxWidth: "100%",
              width: "100%",
              minHeight: "139px",
              fontSize: "15px",
            }}
          />
        </Box>
      </Box>
      <br></br>
      <Box className='submit'>
        <Button
          onClick={handleSubmit}
          type='submit'
          variant='outlined'
          sx={{
            background: "#f0353b",
            color: "white",
            outline: "none",
            border: "none",
            marginTop: "53px",
            "&:hover": {
              border: "none",

              background: "#d90429",
            },
          }}
        >
          Add Coupon
          {status === "loading" && (
            <CircularProgress sx={{ ml: 1 }} size='16px' color='secondary' />
          )}{" "}
        </Button>
      </Box>
    </div>
  );
};

export default CouponFields;
