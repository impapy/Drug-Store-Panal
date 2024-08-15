import { LoadingButton } from "@mui/lab"
import { Button, Grid, Stack, Typography } from "@mui/material"
import { DrugAddInput, useDrugAddMutation } from "../../../api"
import TextInput from "../../UI/TextInput"
import { Form, Formik, FormikHelpers, FormikValues } from "formik"
import { NextPage } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useSnackbar } from "notistack"
import React from "react"
import { getErrorMsg } from "../../../util/getErrorMsg"
import { z } from "zod"
import { toFormikValidationSchema } from "zod-formik-adapter"

const AddDrug: NextPage = () => {
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()

  const { mutate, isError, error, isLoading } = useDrugAddMutation()

  const handleSubmit = (drugAddInput: DrugAddInput, formikHelpers: FormikHelpers<DrugAddInput>) => {
    formikHelpers.setSubmitting(true)
    mutate(
      { input: drugAddInput },
      {
        onSuccess() {
          enqueueSnackbar("Drug Added Successfully", { variant: "success", autoHideDuration: 6000 })

          router.push("/drugs")
        },
        onError(error) {
          enqueueSnackbar(getErrorMsg(error as Error), { variant: "error", autoHideDuration: 6000 })
        },
        onSettled() {
          formikHelpers.setSubmitting(false)
        },
      },
    )
  }

  return (
    <Stack spacing={3}>
      <Stack justifyContent="space-between" direction="row">
        <Typography variant="h5">New Drug</Typography>
      </Stack>
      <Stack>
        <Formik
          initialValues={{
            name: "",
            stock: 1,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, isValid }) => (
            <>
              <Form>
                <Grid container>
                  <Typography variant="h5" component="h5" flex={2}>
                    Add New Drug
                  </Typography>
                </Grid>

                <Grid item container spacing={1} mt={1}>
                  <Grid xs={6} item>
                    <TextInput label="name" name="name" placeholder="Enter Drug Name" />
                  </Grid>
                  <Grid xs={6} item>
                    <TextInput
                      label="Stock"
                      name="stock"
                      type="number"
                      placeholder="Enter Stock"
                      InputProps={{ inputProps: { min: 1 } }}
                    />
                  </Grid>
                  <Grid xs={12} item sx={{ display: "flex", justifyContent: "end" }}>
                    <LoadingButton loading={isLoading} variant="contained" type="submit" disabled={!isValid}>
                      {isError ? "Try again" : "Add"}
                    </LoadingButton>
                  </Grid>
                </Grid>
              </Form>
            </>
          )}
        </Formik>
      </Stack>
    </Stack>
  )
}

export default AddDrug

const validationSchema = z.object({
  name: z.string(),
  stock: z.number().min(1),
})
