import React from 'react';
import Table from 'rc-table';
import { CustomizedTable } from './table.style';
 

const components = {
  table: CustomizedTable,
};

const ReactTable = ({
  columns,
  data,
  ...props
}) => {
  return (
    <>
      <Table columns={columns} data={data} {...props} components={components} />
    </>
  );
};

export default ReactTable;
