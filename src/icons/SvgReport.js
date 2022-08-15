import React from 'react';
import Svg, {Path} from 'react-native-svg';

const defaultProps = {
  width: 20,
  height: 20,
  fill: '#979797',
};

const SvgReport = ({width, height, fill}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 192.287 192.287"
    style={{
      enableBackground: 'new 0 0 192.287 192.287',
    }}
    fill="none">
    <Path
      fill={fill}
      d="M122.901 0H19.699v192.287h152.889v-142.6L122.901 0zm24.08 45.299h-19.686V25.612l19.686 19.687zM34.699 177.287V15h77.596v37.799a7.5 7.5 0 0 0 7.5 7.5h37.793v116.988H34.699z"
    />
    <Path
      fill={fill}
      d="M53.141 149.004h86.006v10H53.141zM53.141 55.101h51.058v10H53.141zM121.248 86.935h5.542l-21.419 21.418-16.748-16.748-37.026 37.029 7.07 7.072 29.956-29.958 16.748 16.747 28.49-28.49v5.53h10v-22.6h-22.613zM53.141 33.283h51.058v10H53.141z"
    />
  </Svg>
);

SvgReport.defaultProps = defaultProps;

export default SvgReport;
