import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CircularProgress, Grid } from "@mui/material";
import { getAllScores } from "../../services/firebase";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Link from "next/link";

interface UserScore {
  username: string;
  score: number;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#21888E",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Leaderboard = () => {
  const [topScores, setTopScores] = useState<UserScore[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const allScores = await getAllScores();
      if (allScores) {
        const sortedScores = allScores.sort((a, b) => b.score - a.score);
        const topFive = sortedScores.slice(0, 5);
        setTopScores(topFive);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        console.log("Failed to fetch leaderboard data.");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-secondary min-h-screen px-6 py-6 ">
      <div className="max-w-[1640px] mx-auto">
        <Link href="/" passHref>
          <button className="text-primary">
            <ArrowBackIosIcon />
            Back
          </button>
        </Link>
        <h1 className="text-center text-lg text-primary font-bold pb-2">
          Top 5 Quiz
        </h1>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <CircularProgress style={{ color: "#21888E" }} />
        </div>
      ) : (
        <Grid
          container
          justifyContent="center"
          className="max-w-[1640px] mx-auto"
        >
          <Grid item xs={12} sm={10} md={8} lg={6}>
            <TableContainer
              component={Paper}
              sx={{ maxWidth: "100%", overflowX: "auto" }}
            >
              <Table sx={{ minWidth: 50 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center" sx={{ width: "20%" }}>
                      Rank
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ width: "40%" }}>
                      Username
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ width: "20%" }}>
                      Score
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topScores.map((row, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {index + 1}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.username}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.score}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Leaderboard;
