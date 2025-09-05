import {UserInfo} from '@/lib/store/user-info-config/type';
import {
  Button,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import {FC} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';

interface Props {
  name: keyof UserInfo;
  defaultValue?: string;
  onSubmit?: (key: keyof UserInfo, value: string) => void;
}

const StyledForm = styled('form')`
  width: 320px;
  display: flex;
  flex-direction: column;
  padding: 24px;
  gap: 20px 0;
`;

const StyledTextField = styled(TextField)`
  .MuiFormHelperText-root {
    /* margin-left: 0; */
  }
`;

const DebugUpdateForm: FC<Props> = ({name, defaultValue, onSubmit}) => {
  const {handleSubmit, register} = useForm();
  const submitHandler: SubmitHandler<any> = (value) => {
    onSubmit?.(name, value[name]);
  };

  const getHelpText = (name: keyof UserInfo) => {
    if (name === 'environment') {
      return 'development or test or production';
    } else if (name === 'platform') {
      return 'IOS or ANDROID';
    }
    return;
  };

  return (
    <StyledForm onSubmit={handleSubmit(submitHandler)}>
      <Typography variant="subtitle2">Update</Typography>

      {name !== 'platform' && name !== 'environment' && (
        <StyledTextField
          label={name}
          size="small"
          defaultValue={defaultValue}
          {...register(name)}
          helperText={getHelpText(name)}
        />
      )}

      {name === 'platform' && (
        <Select
          size="small"
          defaultValue={defaultValue}
          {...register(name)}
          MenuProps={{
            sx: {
              zIndex: 10100,
            },
          }}
        >
          <MenuItem value="IOS">IOS</MenuItem>
          <MenuItem value="ANDROID">ANDROID</MenuItem>
          <MenuItem value="ETC" disabled>
            ETC
          </MenuItem>
        </Select>
      )}

      {name === 'environment' && (
        <Select
          size="small"
          defaultValue={defaultValue}
          {...register(name)}
          MenuProps={{
            sx: {
              zIndex: 10100,
            },
          }}
        >
          <MenuItem value="development">development</MenuItem>
          <MenuItem value="test">test</MenuItem>
          <MenuItem value="production">production</MenuItem>
        </Select>
      )}

      <Button
        type="submit"
        sx={{backgroundColor: 'primary.main', color: '#fff'}}
      >
        확인
      </Button>
    </StyledForm>
  );
};

export default DebugUpdateForm;
