import { NextPage } from "next"
import React from "react"
import Layout from "../../../components/UI/Layout"
import AddDrug from "../../../components/Drugs/AddDrug"

const AddDrugPage: NextPage = () => {
  return (
    <Layout title="New Drug">
      <AddDrug />
    </Layout>
  )
}

export default AddDrugPage
