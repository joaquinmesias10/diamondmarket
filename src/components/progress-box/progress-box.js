import React from 'react';
import {
  ProgressBarWrapper,
  ProgressStep,
  ProgressBar,
  StatusTitle,
  StatusBox,
  StatusDetails,
  CheckMarkWrapper,
} from './progress-box.style';
import { CheckMark } from '../../assets/icons/CheckMark';


const ProgressBox = ({ status, data }) => {
  return (
    <>
      {data.map((item, index) => (
        index != 1 &&
        <ProgressStep key={index}>
          <ProgressBarWrapper className={status >= index + 1 ? 'checked' : ''}>
            <StatusBox>
              {status >= index + 1 ? (
                <CheckMarkWrapper>
                  <CheckMark />
                </CheckMarkWrapper>
              ) : (
                index
              )}
            </StatusBox>
            <ProgressBar />
          </ProgressBarWrapper>
          <StatusDetails>
            {item ? <StatusTitle>{item}</StatusTitle> : ''}
          </StatusDetails>
        </ProgressStep>
      ))}
    </>
  );
};

export default ProgressBox;
