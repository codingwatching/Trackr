import { useContext } from "react";
import { ProjectRouteContext } from "../../routes/ProjectRoute";

const TableView = ({ visualization, metadata }) => {
  const { fields } = useContext(ProjectRouteContext);

  console.log(fields);
  return (
    <>
      hi im a table #{visualization.id}: {metadata.sort} {metadata.fieldId}
    </>
  );
};

export default TableView;
