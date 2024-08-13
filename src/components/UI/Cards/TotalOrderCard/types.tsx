export interface OrderProps {
  bill: {
    total: number
    shippingFees: number
    shipmentPackingFees: number
    subTotal: number
    collectedAmount: number
    margin: number
  }
}
