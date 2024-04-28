"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { DataTablePagination } from "./data-table-pagination";
import React, { useState } from "react";



interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    const [selectedRow, setSelectedRow] = useState(null); 

    const handleRowSelect = (rowId : any) => {
        setSelectedRow(rowId); 
        console.log('rowid:', rowId)
    };

    // TASK : Make first 2 columns (i.e. checkbox and task id) sticky
    // TASK : Make header columns resizable

    return (
        <div className="space-y-4">
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} colSpan={header.colSpan}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext(),
                                                )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody >
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    className={row.id === selectedRow ? "bg-green-300" : ""}
                                    // data-state={row.getIsSelected() && "selected"}
                                    onClick={() => handleRowSelect(row.id)}
                                    
                                >
                                    {/* {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))} */}

                                    {row.getVisibleCells().map((cell, index) => {
                                        if (index === 0) { 
                                            return (
                                                <React.Fragment key={cell.id} >
                                                    <TableCell   style={{ position: index === 0 || index === 1 ? "sticky" : "static", left: 0 }}>
                                                        <input type="checkbox" checked={row.id === selectedRow} readOnly />
                                                    </TableCell>
                                                    <TableCell   style={{ position: index === 0 || index === 1 ? "sticky" : "static", left: 0 }}>
                                                        {flexRender(
                                                            cell.column.columnDef.cell,
                                                            cell.getContext(),
                                                        )}
                                                    </TableCell>
                                                </React.Fragment>
                                            );
                                        } else {
                                            return (
                                                <TableCell key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext(),
                                                    )}
                                                </TableCell>
                                            );
                                        }
                                    })}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} />
        </div>
    );
}
