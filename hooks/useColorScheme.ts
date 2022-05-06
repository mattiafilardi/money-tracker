import {useContext} from "react";
import {themeContext} from "../context/ThemeContext";

export default function useColorScheme(){
  return useContext(themeContext);
}
