import { Dispatch, SetStateAction } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useTable } from "react-table";

import {
  Table,
  Td,
  Th,
  TheadTh,
  TbodyTr,
  TbodyTd,
  PagButton,
} from "../styles/ListView.styles";

import {
  CharacterListData,
  CharacterListResult,
  ColData,
  EpisodeListData,
  EpisodeListResult,
  LocationListResult,
} from "../types/apitypes";

interface IPropTypes {
  itemType: string;
  items: CharacterListResult[] | EpisodeListResult[] | LocationListResult[];
  colsData: ColData[];
  page: number;
  nextPage: number | null;
  setPage: Dispatch<SetStateAction<number>>;
}

export function ListComponent({
  itemType,
  items,
  colsData,
  page,
  nextPage,
  setPage,
}: IPropTypes) {
  const navigate = useNavigate();

  const data = useMemo(() => items, [items]);
  const columns = useMemo(() => colsData, []);

  //console.log(items);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<CharacterListResult | EpisodeListResult | LocationListResult>({
      columns,
      data,
    });

  return (
    <div>
      <Table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TheadTh {...column.getHeaderProps()}>
                  {column.render("Header")}
                </TheadTh>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <TbodyTr
                onClick={() => navigate(`/${itemType}/${row.cells[0].value}`)}
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => (
                  <TbodyTd {...cell.getCellProps()}>
                    {" "}
                    {cell.render("Cell")}{" "}
                  </TbodyTd>
                ))}
              </TbodyTr>
            );
          })}
        </tbody>
      </Table>
      {page != 0 && (
        <div
          style={{
            justifyContent: "right",
            display: "flex",
            paddingRight: "10px",
            paddingBottom: "20px",
          }}
        >
          <PagButton
            onClick={() => {
              setPage(page - 1);
            }}
            style={{ marginRight: "10px" }}
            disabled={page == 1}
          >
            Prev
          </PagButton>
          <PagButton
            onClick={() => {
              setPage(page + 1);
            }}
            disabled={!nextPage}
          >
            Next
          </PagButton>
        </div>
      )}
    </div>
  );
}
