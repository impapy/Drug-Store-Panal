import { Divider } from "@mui/material"
import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import * as R from "ramda"
import React from "react"
import Card from "../Card"
import { OrderProps } from "./types"
import { Bill } from "api"

const TotalOrderCard: React.FC<{ bill: Bill }> = ({ bill }) => {
  return (
    <Card sx={{ maxWidth: 400, maxHeight: 300 }}>
      <Grid item m={2}>
        <Typography color="text.secondary" fontWeight={500} fontFamily="16px">
          Total order`s amount
        </Typography>
        <Grid container mt={2}>
          <Grid item container>
            <Grid item sm={8} xs={10} color="#667085">
              items base price:
            </Grid>
            <Grid item sm={4} xs={2} fontWeight={600}>
              {R.path(["subTotal"], bill)}
            </Grid>
          </Grid>
          <Grid item container mt={1}>
            <Grid item sm={8} xs={10} color="#667085">
              packaging price:
            </Grid>
            <Grid item sm={4} xs={2} fontWeight={600}>
              {R.path(["shipmentPackingFees"], bill)}
            </Grid>
          </Grid>
          <Grid item container mt={1}>
            <Grid item sm={8} xs={10} color="#667085">
              shipping price:
            </Grid>
            <Grid item sm={4} xs={2} fontWeight={600}>
              {R.path(["shippingFees"], bill)}
            </Grid>
          </Grid>
        </Grid>
        <Divider sx={{ marginTop: 2 }} />
        <Grid item container mt={1}>
          <Grid item sm={8} xs={10} color="#667085">
            total amount:
          </Grid>
          <Grid item sm={4} xs={2} fontWeight={600}>
            {R.path(["total"], bill)}
          </Grid>
        </Grid>
        <Grid item container mt={1}>
          <Grid item sm={8} xs={10} color="#667085">
            Total margin:
          </Grid>
          <Grid item sm={4} xs={2} fontWeight={600}>
            {R.path(["margin"], bill)}
          </Grid>
        </Grid>
        <Grid item container mt={1}>
          <Grid item sm={8} xs={10} color="#667085">
            collected Amount:
          </Grid>
          <Grid item sm={4} xs={2} fontWeight={600}>
            {R.path(["collectedAmount"], bill)}
          </Grid>
        </Grid>
      </Grid>
    </Card>
  )
}

export default TotalOrderCard
