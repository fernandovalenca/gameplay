declare module '*.svg' {
  import React, { FunctionComponent } from 'react';
  import { SvgProps } from 'react-native-svg';

  const content: FunctionComponent<SvgProps>;

  export default content;
}
