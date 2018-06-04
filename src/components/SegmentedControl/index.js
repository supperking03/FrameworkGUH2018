import SegmentedControl from './SegmentedControl'
import {ON_PRIMARY_COLOR, PRIMARY_COLOR, PRIMARY_VARIANT_ONE_COLOR} from "../../config/const";

const SEGMENTED_CONTROL_ONE = {
  color: PRIMARY_COLOR,
  secondaryColor: ON_PRIMARY_COLOR,
};

const SEGMENTED_CONTROL_TWO = {
  color: PRIMARY_VARIANT_ONE_COLOR,
  secondaryColor: ON_PRIMARY_COLOR,
};

export {
  SegmentedControl,
  SEGMENTED_CONTROL_ONE,
  SEGMENTED_CONTROL_TWO
}