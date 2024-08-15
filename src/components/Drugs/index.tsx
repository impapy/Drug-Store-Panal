import { LoadingButton } from "@mui/lab"
import { Button, Grid, Stack, Typography } from "@mui/material"
import { GetDrugsQuery, useDrugDeleteMutation, useGetDrugsQuery } from "api"
import Table, { Column } from "components/Table"
import { TablePagination } from "components/Table/TablePagination"
import ButtonDelete from "components/UI/buttons/ButtonDelete"
import EditTableButton from "components/UI/buttons/EditTableButton"
import ErrorAlert from "components/UI/ErrorAlert"
import Modal from "components/UI/Modal"
import { TableSkeleton } from "components/UI/TableSkeleton"
import { NextPage } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { useQueryClient } from "react-query"

const columns: Column[] = [
  {
    key: "name",
    label: "Name",
    type: "text",
  },
  {
    key: "stock",
    label: "Stock",
    type: "text",
  },
  {
    key: "editDrug",
    label: "",
    type: "action",
    payload: ({ row }: any) => {
      return <EditTableButton _id={row._id} url={"url"}/>
    },
  },
 {
    key: "deleteDrug",
    label: "",
    type: "action",
    payload: ({ row }: any) => {
      return <DrugDelete _id={row._id} />
    },
  },
  ]
const Drugs: NextPage = () => {
  const router = useRouter()

  const { data, isLoading, error, isError } = useGetDrugsQuery(
    {
      input: {
        perPage: 10,
        page: +router.query.p! || 1,
      },
    },
    {
      select: (data) => data.drugs,
    },
  )
  if (isLoading) {
    return (
      <TableSkeleton columns={columns} rows={[{ _id: "1" }, { _id: "2" }, { _id: "3" }, { _id: "4" }, { _id: "5" }]} />
    )
  }
  if (isError) {
    return <ErrorAlert error={error} />
  }
  return (
    <Stack spacing={3}>
      <Stack justifyContent="space-between" direction="row">
        <Typography variant="h5">Drugs</Typography>
        <Link
          href="/drugs/add"
          style={{
            font: "inherit",
            color: "inherit",
            textDecoration: "none",
            display: "block",
          }}
        >
          <Button variant="contained" color="secondary">
            New
          </Button>
        </Link>
      </Stack>
      <Stack>
        <Table columns={columns} rows={data?.nodes as any} />
        <TablePagination count={data!.pageInfo.total} />
      </Stack>
    </Stack>
  )
}

export default Drugs

const DrugDelete: React.FC<{ _id: string }> = ({ _id }) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleClick = () => {
    handleOpen()
  }

  return (
    <>
      <ButtonDelete tooltipTitle="Delete Drug" aria-label="Delete Drug" onDelete={handleClick} />
      <Dialog open={open} onOpen={handleOpen} onClose={handleClose} _id={_id} />
    </>
  )
}



const Dialog = ({
  _id,
  open,
  onOpen,
  onClose,
}: {
  open: boolean
  _id: string
  onOpen: () => void
  onClose: () => void
}) => {
  const queryClient = useQueryClient()
  const { mutate, isError, isLoading } = useDrugDeleteMutation({
    onSuccess() {
      queryClient.invalidateQueries("GetDrugs")
      onClose()
    },
  })

  return (
    <Modal open={open}>
      <Grid spacing={3} container direction="column">
        <Grid item>
          <Typography variant="h5">Are you sure you want to delete this Drug?</Typography>
        </Grid>
        <Grid item alignSelf="flex-end">
          <Stack spacing={3} direction="row">
            <Button variant="contained" onClick={onClose} color="secondary">
              Cancel
            </Button>
            <LoadingButton
              loading={isLoading}
              loadingPosition="center"
              variant="contained"
              color="warning"
              onClick={() => {
                mutate({ drugId: _id })
              }}
            >
              Delete
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </Modal>
  )
}
