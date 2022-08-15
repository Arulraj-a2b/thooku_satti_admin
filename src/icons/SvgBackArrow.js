import React from "react";
import Svg, { Path } from "react-native-svg";

const defaultProps = {
  width: 12,
  height: 10,
  fill: '#E59722',
};

const SvgBackArrow = ({ width, height, fill, style }) => (
  <Svg width={width} height={height} viewBox="0 0 7 12" fill="none">
    <Path
      d="M6 1L1 5.68393L5.81607 10.5"
      stroke="#111719"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

SvgBackArrow.defaultProps = defaultProps;

export default SvgBackArrow;
