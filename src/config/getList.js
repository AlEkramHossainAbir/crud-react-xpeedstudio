import { useEffect, useState } from "react";


const getList = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [columns, setColumns] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [data, setData] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    let column = [];

    fetch(" http://localhost/api/list.php")
      .then((response) => response.json())
      .then((json) => {
        let colObj = json.data.headers[0];

        for (let key in colObj) {
          if (!colObj[key].hidden) {
            let obj = {
              Header: colObj[key].title,
              accessor: key,
              sortable: colObj[key].sortable,
              disableFilters: !colObj[key].searchable,
            };

            column.push(obj);
          }
        }
        console.log(column)
        setColumns(column);
        setData(json.data.rows);
      });
  }, []);
  return [columns, data, setData];
};
export default getList;
