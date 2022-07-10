import React from 'react';
import Svg, {Path} from 'react-native-svg';

const defaultProps = {
  width: 18,
  height: 18,
};

const SvgLogout = ({width, height}) => (
  <Svg
    style={{
      width: '1em',
      height: '1em',
      verticalAlign: 'middle',
      fill: 'currentColor',
      overflow: 'hidden',
    }}
    width={width}
    height={height}
    viewBox="0 0 1024 1024"
    fill="none">
    <Path
      fill={'#e59722'}
      d="M768 106v78c97.2 76 160 194.8 160 328 0 229.6-186.4 416-416 416S96 741.6 96 512c0-133.2 62.8-251.6 160-328v-78C121.6 190.8 32 341.2 32 512c0 265.2 214.8 480 480 480s480-214.8 480-480c0-170.8-89.6-321.2-224-406z"
    />
    <Path
      fill={'#e59722'}
      d="M512 32c-17.6 0-32 14.4-32 32v448c0 17.6 14.4 32 32 32s32-14.4 32-32V64c0-17.6-14.4-32-32-32z"
    />
  </Svg>
);

SvgLogout.defaultProps = defaultProps;

export default SvgLogout;
