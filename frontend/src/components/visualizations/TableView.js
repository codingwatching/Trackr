const TableView = ({ visualization, fields, metadata }) => {
  console.log(fields);
  return (
    <>
      hi im a table #{visualization.id}: {metadata.sort} {metadata.fieldId}
    </>
  );
};

export default TableView;
