import { useState } from 'react'
import { useGetMyPaymentsQuery } from '@/shared/api/subscriptionApi'
import { Pagination } from '@/shared/ui/base/Pagination/Pagination'
import styles from './MyPayments.module.scss'
import type { Payment } from '@/shared/lib/types/subscriptionTypes'

export const MyPayments = () => {
  // Your array of payments
  const payments: Payment[] = [
    {
      userId: 1,
      subscriptionId: 'sub_001',
      dateOfPayment: '2025-01-01',
      endDateOfSubscription: '2025-02-01',
      price: 9.99,
      subscriptionType: "WEEKLY",
      paymentType: "PAYPAL",
    },
    {
      userId: 2,
      subscriptionId: 'sub_002',
      dateOfPayment: '2025-01-05',
      endDateOfSubscription: '2025-02-05',
      price: 19.99,
      subscriptionType: "WEEKLY",
      paymentType: "PAYPAL"
    },
    {
      userId: 3,
      subscriptionId: 'sub_003',
      dateOfPayment: '2025-01-10',
      endDateOfSubscription: '2025-02-10',
      price: 29.99,
      subscriptionType: "WEEKLY",
      paymentType: "PAYPAL",
    },
    {
      userId: 4,
      subscriptionId: 'sub_004',
      dateOfPayment: '2025-02-01',
      endDateOfSubscription: '2025-03-01',
      price: 9.99,
      subscriptionType: "WEEKLY",
      paymentType: "PAYPAL",
    },
    {
      userId: 5,
      subscriptionId: 'sub_005',
      dateOfPayment: '2025-02-07',
      endDateOfSubscription: '2025-03-07',
      price: 19.99,
      subscriptionType: "WEEKLY",
      paymentType: "PAYPAL"
    },
    {
      userId: 6,
      subscriptionId: 'sub_006',
      dateOfPayment: '2025-02-12',
      endDateOfSubscription: '2025-03-12',
      price: 29.99,
      subscriptionType: "WEEKLY",
      paymentType: "PAYPAL",
    },
    {
      userId: 7,
      subscriptionId: 'sub_007',
      dateOfPayment: '2025-03-01',
      endDateOfSubscription: '2025-04-01',
      price: 9.99,
      subscriptionType: "WEEKLY",
      paymentType: "PAYPAL",
    },
    {
      userId: 8,
      subscriptionId: 'sub_008',
      dateOfPayment: '2025-03-08',
      endDateOfSubscription: '2025-04-08',
      price: 19.99,
      subscriptionType: "WEEKLY",
      paymentType: "PAYPAL"
    },
    {
      userId: 9,
      subscriptionId: 'sub_009',
      dateOfPayment: '2025-03-15',
      endDateOfSubscription: '2025-04-15',
      price: 29.99,
      subscriptionType: "WEEKLY",
      paymentType: "PAYPAL",
    },
    {
      userId: 10,
      subscriptionId: 'sub_010',
      dateOfPayment: '2025-04-01',
      endDateOfSubscription: '2025-05-01',
      price: 19.99,
      subscriptionType: "WEEKLY",
      paymentType: "PAYPAL",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1)
  // Changed the default page size to 2 as requested
  const [pageSize, setPageSize] = useState(2)

  // Simulate the API call by using the payments array directly
  const { data: paymentsData, error, isLoading } = useGetMyPaymentsQuery()

  // Handle errors and loading states
  if (isLoading) return <div>Loading payments...</div>
  if (error) return <div>Error loading payments</div>

  // For this example, we'll use the static payments array instead of paymentsData
  if (!payments || payments.length === 0) return <div>No payment records found</div>

  // Calculate pagination
  const indexOfLastItem = currentPage * pageSize
  const indexOfFirstItem = indexOfLastItem - pageSize
  const currentItems = paymentsData?.slice(indexOfFirstItem, indexOfLastItem)

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Handle page size change
  const handlePageSizeChange = (size: string) => {
    setPageSize(Number(size))
    setCurrentPage(1) // Reset to first page when changing page size
  }

  return (
    <div className={styles.paymentsContainer}>
      <h2>My Payments</h2>

      <div className={styles.tableContainer}>
        <table className={styles.paymentsTable}>
          <thead>
          <tr>
            <th>Date of Payment</th>
            <th>End date of subscription</th>
            <th>Price</th>
            <th>Subscription Type</th>
            <th>Payment Type</th>
          </tr>
          </thead>
          <tbody>
          {currentItems?.map((payment, index) => (
            <tr key={`payment-${payment.subscriptionId}`}>
              <td>{payment.dateOfPayment}</td>
              <td>{payment.endDateOfSubscription}</td>
              <td>${payment.price}</td>
              <td>{payment.subscriptionType}</td>
              <td>{payment.paymentType}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>

      <Pagination
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        currentPage={currentPage}
        pageSize={pageSize}
        totalCount={paymentsData?.length} // Use the payments array length instead of paymentsData
      />
    </div>
  )
}