import TableRowsIcon from "@mui/icons-material/TableRows";
import TableEditor from "./TableEditor";
import TableView from "./TableView";

const Table = {
  name: "Table",
  icon: TableRowsIcon,
  editor: TableEditor,
  view: TableView,

  serialize: (id, fieldId, sort) => {
    return {
      id,
      metadata: {
        name: Table.name,
        fieldId,
        sort,
      },
    };
  },
};

export default Table;
