import React from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Select} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles({
    table: {
        width: '65%',
        marginRight: '0px',
        marginLeft: 'auto',
        marginTop: '100px'
    },
    yearSelector: {
        float: 'right',
        padding: '20px'
    },
});

function createData(year: number, month: string, sold: number, discount: number, income: number, profit: number) {
    return {year, month, sold, discount, income, profit};
}

const rows = [
    createData(2020,'Január', 543, 443, 325000, 10000),
    createData(2019, 'Február', 343, 143, 125000, -25000),
    createData(2018, 'Március', 720, 220, 525000, 20000),
    createData(2020,'Április', 610, 100, 424000, 80000),
];


export default function ReportPage() {
    const classes = useStyles();
    const [selectedYear, setSelectedYear] = React.useState(2020);

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedYear(event.target.value as number);
    };

    return (
        <>
            <TableContainer component={Paper}>
                <div>
                    <Select
                        labelId="year-select-label"
                        id="year-select"
                        label="Év:"
                        value={selectedYear}
                        onChange={handleChange}
                        className={classes.yearSelector}
                    >
                        //TODO: fetch years from backend
                        <MenuItem value={2020}>2020</MenuItem>
                        <MenuItem value={2019}>2019</MenuItem>
                        <MenuItem value={2017}>2018</MenuItem>
                    </Select>
                </div>

                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Hónap</TableCell>
                            <TableCell align="right">Eladott jegyek száma</TableCell>
                            <TableCell align="right">Kedvezményes</TableCell>
                            <TableCell align="right">Bevétel (Ft)</TableCell>
                            <TableCell align="right">Profit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            row.year === selectedYear &&
                            <TableRow key={row.month}>
                                <TableCell component="th" scope="row">
                                    {row.month}
                                </TableCell>
                                <TableCell align="right">{row.sold}</TableCell>
                                <TableCell align="right">{row.discount}</TableCell>
                                <TableCell align="right">{row.income}</TableCell>
                                <TableCell align="right">{row.profit}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}