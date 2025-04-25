import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/Table/Table'
import type { Payment } from '@/shared/lib/types/subscriptionTypes'
import s from './MyPaymentsTable.module.scss'

type MyPaymentsTable = {
  items: Payment[]
}

export const MyPaymentsTable = ({items: currentItems}: MyPaymentsTable) => {

  function formatInterval(freq: "WEEKLY" | "MONTHLY" | "DAY"): string {
    switch (freq) {
      case "WEEKLY":
        return "7 days";
      case "MONTHLY":
        return "1 month";
      case "DAY":
        return "1 day";
      default:
        throw new Error(`Unsupported frequency: ${freq}`);
    }
  }
  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date of Payment</TableHead>
          <TableHead>End date of subscription</TableHead>
          <TableHead className={s.centeredCell} >Price</TableHead>
          <TableHead>Subscription Type</TableHead>
          <TableHead>Payment Type</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {currentItems?.map((payment) => (
          <TableRow key={`payment-${payment.subscriptionId}`}>
            <TableCell>{new Date(payment.dateOfPayment).toLocaleDateString()}</TableCell>
            <TableCell>{new Date(payment.endDateOfSubscription).toLocaleDateString()}</TableCell>
            <TableCell className={s.centeredCell}>${payment.price}</TableCell>
            <TableCell>{formatInterval(payment.subscriptionType)}</TableCell>
            <TableCell>{capitalize(payment.paymentType)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}