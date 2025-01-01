# Receipt Email Template

We need to now create our email template for the purchase receipt. We will use the `resend` and `react-email` packages to create our email template.

If you go to this link: [https://www.npmjs.com/package/resend](https://www.npmjs.com/package/resend) you will see how to use the `resend` package to send emails. We simply import the `resend` package and then call the `resend.emails.send` method with the properties of `to`, `from`, `subject`, etc. Since we are using React, we can set a property called `react` and pass in our email template.

So let's create a new file in the root of our project at `email/index.tsx`. Don't add it to the `app` folder because we don't want it to be a page.

Add the following code for now:

```tsx
import { Resend } from 'resend';
import { SENDER_EMAIL, APP_NAME } from '@/lib/constants';
import { Order } from '@/types';

const resend = new Resend(process.env.RESEND_API_KEY as string);

export const sendPurchaseReceipt = async ({ order }: { order: Order }) => {
  await resend.emails.send({
    from: `${APP_NAME} <${SENDER_EMAIL}>`,
    to: order.user.email,
    subject: `Order Confirmation ${order.id}`,
    react: <>EMAIL COMPONENT</>,
  });
};
```

We are just creating a new instance of the `Resend` class and calling the `emails.send` method. We are passing in the properties of `from`, `to`, `subject`, and `react`. The `react` property is where we will pass in our email template.

NOTE: While in development, you can only send emails to your own email address so just make sure when you test, you create a prostore account with the same email address that you used to register for Resend.

Let's create a file at `email/purchase-receipt.tsx`. This is where we will create our email template.

Add the following imports and type:

```tsx
import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import { formatCurrency } from '@/lib/utils';
import { Order } from '@/types';
import sampleData from '@/db/sample-data';
require('dotenv').config();

type OrderInformationProps = {
  order: Order;
};

const dateFormatter = new Intl.DateTimeFormat('en', { dateStyle: 'medium' });
```

We are bringing in a bunch of components from the `@react-email/components` package. We are also bringing in the `formatCurrency` function from our `lib/utils` file. We are also bringing in the `Order` type from our `types` file. We are also bringing in the `sampleData` object from our `db/sample-data` file. This is because I'm going to use sample data to preview the email.

Since we are using environment variables outside of the main app folder, we need to require the `dotenv` package and call the `config` method.

We also create a `dateFormatter` object to format the date.

## Email Template Function

Create the following function with the components for our email template:

```tsx
export default function PurchaseReceiptEmail({ order }: {order: Order}) {
  return (
    <Html>
      <Preview>View order receipt</Preview>
      <Tailwind>
        <Head />
        <Body className='font-sans bg-white'>
          <Container className='max-w-xl'>
            <Heading>Purchase Receipt</Heading>
            <Section>
              <Row>
                <Column>
                  <Text className='mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4'>
                    Order ID
                  </Text>
                  <Text className='mt-0 mr-4'>{order.id.toString()}</Text>
                </Column>
                <Column>
                  <Text className='mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4'>
                    Purchased On
                  </Text>
                  <Text className='mt-0 mr-4'>
                    {dateFormatter.format(order.createdAt)}
                  </Text>
                </Column>
                <Column>
                  <Text className='mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4'>
                    Price Paid
                  </Text>
                  <Text className='mt-0 mr-4'>
                    {formatCurrency(order.totalPrice)}
                  </Text>
                </Column>
              </Row>
            </Section>
            <Section className='border border-solid border-gray-500 rounded-lg p-4 md:p-6 my-4'>
              {order.orderItems.map((item) => (
                <Row key={item.productId} className='mt-8'>
                  <Column className='w-20'>
                    <Img
                      width='80'
                      alt={item.name}
                      className='rounded'
                      src={
                        item.image.startsWith('/')
                          ? `${process.env.NEXT_PUBLIC_SERVER_URL}${item.image}`
                          : item.image
                      }
                    />
                  </Column>
                  <Column className='align-top'>
                    <Text className='mx-2 my-0'>
                      {item.name} x {item.qty}
                    </Text>
                  </Column>
                  <Column align='right' className='align-top'>
                    <Text className='m-0 '>{formatCurrency(item.price)}</Text>
                  </Column>
                </Row>
              ))}
              {[
                { name: 'Items', price: order.itemsPrice },
                { name: 'Tax', price: order.taxPrice },
                { name: 'Shipping', price: order.shippingPrice },
                { name: 'Total', price: order.totalPrice },
              ].map(({ name, price }) => (
                <Row key={name} className='py-1'>
                  <Column align='right'>{name}:</Column>
                  <Column align='right' width={70} className='align-top'>
                    <Text className='m-0'>{formatCurrency(price)}</Text>
                  </Column>
                </Row>
              ))}
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
```

In this template, we used the `Tailwind` component to apply Tailwind CSS classes to our email. We are also using the `Row` and `Column` components to layout our email. We are also using the `Img` component to display an image. We are also using the `formatCurrency` function to format the price.

We get the order items and map over them to display a row for each item. We are also displaying the total price of the order. For the image, we are checking if the image is a relative path or an absolute path. If it is a relative path, we are adding the `process.env.NEXT_PUBLIC_SERVER_URL` to the path.

## Apply the Email Template

Now back in the `email/index.tsx` file, we need to apply the `PurchaseReceiptEmail` component to the `send` function.

Import it like this:

```tsx
import PurchaseReceiptEmail from './purchase-receipt';
```

Then pass it into the `react` property with the order as a prop:

```tsx
await resend.emails.send({
  from: `${APP_NAME} <${SENDER_EMAIL}>`,
  to: order.user.email,
  subject: `Order Confirmation ${order.id}`,
  react: <PurchaseReceiptEmail order={order} />, 👈 Add this line
});
```

In the next lesson, we are going to add some preview props to our email template so that we can preview it in the browser.
