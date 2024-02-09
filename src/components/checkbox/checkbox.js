import React, { useState } from 'react';
import {
  StyledCheckBox,
  StyledCheckBoxLabel,
  StyledCheckBoxLabelText,
  StyledCheckBoxInput,
  StyledCheckBoxInputIndicator,
} from './checkbox.style';

const CheckBox = ({
  className,
  isChecked = false,
  labelText,
  id,
  labelPosition = 'right',
  disabled = false,
  ...props
}) => {
  // use toggle hooks
  const [checked, setChecked] = useState(isChecked);

  return (
    <StyledCheckBox className={`pickbazar__checkbox ${className}`.trim()}>
      <StyledCheckBoxLabel htmlFor={id} position={labelPosition}>
        {labelText && (
          <StyledCheckBoxLabelText position={labelPosition}>
            {labelText}
          </StyledCheckBoxLabelText>
        )}
        <StyledCheckBoxInput
          type="checkbox"
          className="checkbox-input"
          id={id}
          checked={checked}
          onChange={() => setChecked((prev) => !prev)}
          disabled={disabled}
          {...props}
        />
        <StyledCheckBoxInputIndicator />
      </StyledCheckBoxLabel>
    </StyledCheckBox>
  );
};

export default CheckBox;
