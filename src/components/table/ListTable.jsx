import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTable, useFilters, useSortBy } from "react-table";


import successMessages from "../../config/successMessage";
import getList from '../../config/getList'
import './ListTable.css'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import Filter from "../filter/Filter";


const ListTable = () => {
  const [columns, data] = getList();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const draggables = document.querySelectorAll(".draggable");
    const containers = document.querySelectorAll(".droppable");

    draggables.forEach((draggable) => {
      draggable.addEventListener("dragstart", () => {
        draggable.classList.add("dragging");
      });

      draggable.addEventListener("dragend", () => {
        draggable.classList.remove("dragging");
        successMessages("http://localhost/api/reorder.php", setLoading).then(
          (response) => {
            setLoading(false);
          }
        );
      });
    });

    containers.forEach((container) => {
      container.addEventListener("dragover", (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(container, e.clientY);
        const draggable = document.querySelector(".dragging");
        if (afterElement == null) {
          container.appendChild(draggable);
        } else {
          container.insertBefore(draggable, afterElement);
        }
      });
    });

    function getDragAfterElement(container, y) {
      const draggableElements = [
        ...container.querySelectorAll(".draggable:not(.dragging)"),
      ];

      return draggableElements.reduce(
        (closest, child) => {
          const box = child.getBoundingClientRect();
          const offset = y - box.top - box.height / 2;
          if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
          } else {
            return closest;
          }
        },
        { offset: Number.NEGATIVE_INFINITY }
      ).element;
    }
  }, [data]);

  const defaultColumn = useMemo(() => {
    return {
      Filter: Filter,
    };
  }, []);

  const tableInstance = useTable(
    { columns, data, defaultColumn },
    useFilters,
    useSortBy
  );

  const { headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <TableContainer>
      {
        <Table>
          <TableHead style={{
            backgroundColor: '#EEBC1D',

          }}>
            {headerGroups.map((headerGroup) => (
              <TableRow >
                {headerGroup.headers.map((column) =>
                  column.sortable ? (
                    <TableCell style={{
                      color: 'black',
                      fontWeight: 'bold',

                    }}
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      <Typography style={{
                        textAlign: 'center',
                        fontSize: '18px',
                        fontWeight: '700 '

                      }}>
                        {column.render("Header")}
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? " 🔽"
                              : " 🔼"
                            : ""}
                        </span>

                        <div>
                          {column.canFilter && column.render("Filter")}
                        </div>
                      </Typography>
                    </TableCell>
                  ) : (
                    <TableCell>
                      <Typography style={{
                        textAlign: 'center',
                        fontSize: '18px',
                        fontWeight: '700 '
                      }}>
                        {column.render("Header")}
                        <div>
                          {column.canFilter && column.render("Filter")}
                        </div>
                      </Typography>

                    </TableCell>
                  )
                )}
              </TableRow>
            ))}
          </TableHead>
          <TableBody className="droppable" >
            {rows.map((row) => {
              prepareRow(row);
              return (
                <TableRow
                  draggable="true"
                  className="draggable"
                >
                  {row.cells.map((cell) => {
                    return (
                      <TableCell style={{
                        gap: 15
                      }}>
                        <Typography style={{
                          textAlign: 'center',
                          fontSize: '16px'
                        }}>
                          {cell.column.id === "id" ? (
                            <Link to={`form/${cell.row.original.id}`}>
                              {cell.render("Cell")}
                            </Link>
                          ) : (
                            cell.render("Cell")
                          )}</Typography>
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      }
    </TableContainer>
  );
};

export default ListTable;