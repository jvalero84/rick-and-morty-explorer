import { Dispatch, SetStateAction } from "react";
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
  setPage: Dispatch<SetStateAction<number>>;
}

export function ListComponent({
  itemType,
  items,
  colsData,
  page,
  setPage,
}: IPropTypes) {
  const navigate = useNavigate();

  const data = useMemo(() => items, [items]);
  const columns = useMemo(() => colsData, []);

  console.log(items);

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
      <button
        onClick={() => {
          setPage(page - 1);
        }}
        className="btn"
        disabled={page == 1}
      >
        Prev
      </button>
      <button
        onClick={() => {
          setPage(page + 1);
        }}
        className="btn"
      >
        Next
      </button>
    </div>
  );
}
