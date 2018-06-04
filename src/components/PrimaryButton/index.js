import PrimaryButton from "./PrimaryButton";
import FacebookLoginButton from './FacebookLoginButton'
import {ON_PRIMARY_COLOR, PRIMARY_COLOR, PRIMARY_VARIANT_ONE_COLOR} from "../../config/const";

const PRIMARY_BUTTON_ONE = {
  color: PRIMARY_COLOR,
  textColor: ON_PRIMARY_COLOR,
};

const PRIMARY_BUTTON_TWO = {
  color: 'rgb(59, 89, 153)',
  textColor: 'white',
};

const PRIMARY_BUTTON_THREE = {
  color: PRIMARY_VARIANT_ONE_COLOR,
  textColor: ON_PRIMARY_COLOR,
};

export {
  FacebookLoginButton,
  PrimaryButton,
  PRIMARY_BUTTON_ONE,
  PRIMARY_BUTTON_TWO,
  PRIMARY_BUTTON_THREE,
};