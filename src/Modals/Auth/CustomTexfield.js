import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import { FormControl } from '@mui/material';

const CustomTextfield = (props) => {
  return (
    <FormControl variant="outlined">
  
    <InputLabel htmlFor="outlined-adornment-input">{props.label}</InputLabel>
          <OutlinedInput
            id={`outlined-adornment-input-${props.label}`}
            type={props.type}
            value={props.value}
            onChange={props.onChange}
            inputProps={{ maxLength: props.maxLength }}
            endAdornment={
              <InputAdornment position="end">
                {props.adornment}
              </InputAdornment>
            }
            label={props.label}
          />
    </FormControl>
  )
}

export default CustomTextfield