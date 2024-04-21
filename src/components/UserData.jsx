import React, { useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import '../App.css';

const UserData = ({ users }) => {
  const [expanded, setExpanded] = useState({});

  const toggle = (assetclass) => {
    setExpanded(prevState => ({
      ...prevState,
      [assetclass]: !prevState[assetclass]
    }));
  };

  const groupByAssetClass = {};

  users.forEach(user => {
    if (!groupByAssetClass[user.asset_class]) {
      groupByAssetClass[user.asset_class] = [];
    }
    groupByAssetClass[user.asset_class].push(user);
  });

  return (
    <Table className="table">
      <TableBody>
        {Object.entries(groupByAssetClass).map(([assetclass, users]) => (
          <React.Fragment key={assetclass}>
            <TableRow>
              <TableCell colSpan={6}>
                <span className="expand-icon" onClick={() => toggle(assetclass)}>
                  {expanded[assetclass] ? <ExpandLess /> : <ExpandMore />}
                </span>
                <span className="asset-class-name">{assetclass.toUpperCase()} ({users.length})</span>
              </TableCell>
            </TableRow>
            {expanded[assetclass] && (
              <>
                <TableRow className="thead">
                  <TableCell>Name of the Holding</TableCell>
                  <TableCell>Ticker</TableCell>
                  <TableCell>Average Price</TableCell>
                  <TableCell>Market Price</TableCell>
                  <TableCell>Latest Change Percentage</TableCell>
                  <TableCell>Market Value In Base CCY</TableCell>
                </TableRow>
                {users.map((currUser, index) => (
                  <TableRow key={index}>
                    <TableCell>{currUser.name}</TableCell>
                    <TableCell>{currUser.ticker}</TableCell>
                    <TableCell>{currUser.avg_price}</TableCell>
                    <TableCell>{currUser.market_price}</TableCell>
                    <TableCell className={currUser.latest_chg_pct < 0 ? 'red-text' : ''}>
                      {currUser.latest_chg_pct}
                    </TableCell>
                    <TableCell className={currUser.market_value_ccy < 0 ? 'red-text' : ''}>
                      {currUser.market_value_ccy}
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserData;
