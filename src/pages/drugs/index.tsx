import { NextPage } from "next"
import React from "react"
import Layout from "../../components/UI/Layout"
import Drugs from "../../components/Drugs"

const DrugsPage: NextPage = () => {
  return (
    <Layout title="drugs">
      <Drugs />
    </Layout>
  )
}

export default DrugsPage
