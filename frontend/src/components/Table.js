import TableRowsIcon from "@mui/icons-material/TableRows";
import TableEditor from "./TableEditor";
import TableView from "./TableView";

const Table = {
  name: "Table",
  color: "#d1f1ff",
  icon: TableRowsIcon,
  editor: TableEditor,
  view: TableView,

  serialize: (id, fieldId, sort) => {
    return {
      id,
      metadata: {
        fieldId,
        sort,
      },
    };
  },
};

export default Table;
