import GridView from "./GridView/GridView";
import BoundField from "./GridView/BoundField";
import Columns from "./GridView/Columns";
import PagerSettings from "./GridView/PagerSettings";
import DropDownList from "./InputFields/DropDownList";
import ListItem from "./private/ListItem";
import TextBox from "./InputFields/TextBox";
import Label from "./InputFields/Label";
import Panel from "./InputFields/Panel";
//export { GridView, BoundField, Columns, PagerSettings, DropDownList };
export default function asp() {
  return null;
}
asp.GridView = GridView;
asp.BoundField = BoundField;
asp.Columns = Columns;
asp.PagerSettings = PagerSettings;
asp.DropDownList = DropDownList;
asp.ListItem = ListItem;
asp.TextBox = TextBox;
asp.Label = Label;
asp.Panel = Panel;
