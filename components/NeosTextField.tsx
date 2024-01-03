'use client';
import { styled, Theme } from '@mui/system';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import { Box } from '@mui/material';

const NeosInputBase = styled(TextField)({
    color: 'inherit',
    borderRadius: '4px',
    width: '100%',
    '& .MuiInputBase-input': {
        border: "1px solid #E0E0E0",
        width: '100%',
        borderRadius: '8px',
        fontSize: "14px",
        padding: "13px 16px",
        '&:focus': {
            border: "1px solid #000",
        },
        '&::placeholder': {
            color: '#828282',
        },
    },
    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
});

const NeosLabel = styled(FormLabel)(() => ({
    color: "#000",
    fontSize: "14px",
    fontWeight: 500,
    display: "inline-flex",
    marginBottom: "7px",
    lineHeight: "17px",
}));

interface NeosTextFieldProps{
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    defaultValue?: string;
    placeholder?: string;
    name?: string;
    remainingProps?: any;
    label?: string;
    value?:string;
}

const NeosTextField: React.FC<NeosTextFieldProps> = (props) => {
    const {
        onChange,
        name,
        placeholder,
        onBlur,
        defaultValue,
        label,
        ...remainingProps
    } = props;

    return (
        <Box>
            {label && <NeosLabel>{label}</NeosLabel> }
            <NeosInputBase
                variant="outlined"
                size="small"
                {...remainingProps}
                onChange={onChange}
                name={name}
                placeholder={placeholder}
                onBlur={onBlur}
                defaultValue={defaultValue}
            />
        </Box>

    );
};

export default NeosTextField;
