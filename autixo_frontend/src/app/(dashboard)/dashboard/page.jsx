import { Button, Card, Chip, Separator, Table } from "@heroui/react";
import {
  LuArrowRight,
  LuBadgeCheck,
  LuCalendarClock,
  LuCar,
  LuClock3,
  LuDollarSign,
  LuSparkles,
  LuUsers,
} from "react-icons/lu";

const statCards = [
  {
    title: "Total Revenue",
    value: "$24,580",
    delta: "+12.4% this month",
    tone: "success",
    icon: LuDollarSign,
  },
  {
    title: "Active Bookings",
    value: "38",
    delta: "+6 new today",
    tone: "primary",
    icon: LuCalendarClock,
  },
  {
    title: "Fleet Available",
    value: "21 Cars",
    delta: "3 in maintenance",
    tone: "warning",
    icon: LuCar,
  },
  {
    title: "Customer Rating",
    value: "4.9/5",
    delta: "Based on 284 reviews",
    tone: "secondary",
    icon: LuUsers,
  },
];

const recentBookings = [
  {
    id: "BK-2901",
    customer: "Tanvir Hasan",
    car: "Tesla Model Y",
    date: "Aug 1, 2026",
    amount: "$220",
    status: "Confirmed",
  },
  {
    id: "BK-2897",
    customer: "Rimsha Noor",
    car: "BMW X5",
    date: "Jul 31, 2026",
    amount: "$340",
    status: "Pending",
  },
  {
    id: "BK-2891",
    customer: "Arif Mahmud",
    car: "Toyota Prado",
    date: "Jul 30, 2026",
    amount: "$260",
    status: "Completed",
  },
  {
    id: "BK-2888",
    customer: "Nadia Farin",
    car: "Mercedes C200",
    date: "Jul 30, 2026",
    amount: "$300",
    status: "Confirmed",
  },
];

const topCars = [
  { name: "Tesla Model Y", trips: 42, utilization: 86 },
  { name: "BMW X5", trips: 35, utilization: 78 },
  { name: "Toyota Prado", trips: 31, utilization: 72 },
  { name: "Mercedes C200", trips: 28, utilization: 67 },
];

const statusColorMap = {
  Confirmed: "success",
  Pending: "warning",
  Completed: "primary",
};

export default function DashBoardPage() {
  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 py-2">
      <section className="relative overflow-hidden rounded-3xl border border-default-200 bg-linear-to-br from-accent/95 via-accent to-primary/80 p-8 text-accent-foreground shadow-lg">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full bg-white/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-14 size-60 rounded-full bg-black/20 blur-3xl"
        />

        <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <Chip color="warning" variant="flat" size="sm">
              <LuSparkles className="mr-1.5 size-3.5" />
              Monthly Snapshot
            </Chip>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Welcome back, Pradipta
            </h1>
            <p className="text-sm leading-6 text-accent-foreground/80 md:text-base">
              Your fleet performance is looking strong today. Keep momentum with
              quick actions and monitor bookings in a modern command center.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button size="lg" variant="flat" className="font-semibold">
              Add New Car
            </Button>
            <Button
              size="lg"
              variant="solid"
              className="font-semibold bg-background text-foreground"
            >
              View Bookings
            </Button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map(({ title, value, delta, tone, icon: Icon }) => (
          <Card
            key={title}
            className="border border-default-200 bg-background/90 shadow-sm"
          >
            <Card.Content className="gap-4 p-5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm text-muted">{title}</p>
                  <h2 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                    {value}
                  </h2>
                </div>
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-default-100 text-foreground/80">
                  <Icon className="size-5" />
                </span>
              </div>

              <Chip color={tone} variant="flat" size="sm" className="w-fit">
                {delta}
              </Chip>
            </Card.Content>
          </Card>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.65fr_1fr]">
        <Card className="border border-default-200 bg-background/90 shadow-sm">
          <Card.Header className="items-center justify-between px-6 pt-6">
            <div>
              <Card.Title className="text-lg font-semibold text-foreground">
                Recent Bookings
              </Card.Title>
              <Card.Description className="text-sm text-muted">
                Latest customer booking activity overview.
              </Card.Description>
            </div>
            <Button variant="light" size="sm" className="font-medium">
              See All
              <LuArrowRight className="ml-1 size-4" />
            </Button>
          </Card.Header>

          <Card.Content className="p-6 pt-4">
            <Table aria-label="Recent bookings" className="w-full">
              <Table.ScrollContainer>
                <Table.Content>
                  <Table.Header>
                    <Table.Column>Booking ID</Table.Column>
                    <Table.Column>Customer</Table.Column>
                    <Table.Column>Car</Table.Column>
                    <Table.Column>Date</Table.Column>
                    <Table.Column>Amount</Table.Column>
                    <Table.Column>Status</Table.Column>
                  </Table.Header>

                  <Table.Body>
                    {recentBookings.map((booking) => (
                      <Table.Row key={booking.id}>
                        <Table.Cell className="font-medium">
                          {booking.id}
                        </Table.Cell>
                        <Table.Cell>{booking.customer}</Table.Cell>
                        <Table.Cell>{booking.car}</Table.Cell>
                        <Table.Cell>{booking.date}</Table.Cell>
                        <Table.Cell>{booking.amount}</Table.Cell>
                        <Table.Cell>
                          <Chip
                            size="sm"
                            color={statusColorMap[booking.status]}
                            variant="flat"
                          >
                            {booking.status}
                          </Chip>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Content>
              </Table.ScrollContainer>
            </Table>
          </Card.Content>
        </Card>

        <div className="space-y-6">
          <Card className="border border-default-200 bg-background/90 shadow-sm">
            <Card.Header className="px-6 pt-6">
              <div>
                <Card.Title className="text-lg font-semibold text-foreground">
                  Top Performing Cars
                </Card.Title>
                <Card.Description className="text-sm text-muted">
                  Fleet utilization preview for this week.
                </Card.Description>
              </div>
            </Card.Header>

            <Card.Content className="space-y-4 p-6 pt-4">
              {topCars.map((item) => (
                <div key={item.name} className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-foreground">
                      {item.name}
                    </p>
                    <span className="text-xs text-muted">
                      {item.trips} trips
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-default-100">
                    <div
                      className="h-2 rounded-full bg-accent"
                      style={{ width: `${item.utilization}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted">
                    Utilization {item.utilization}%
                  </p>
                </div>
              ))}
            </Card.Content>
          </Card>

          <Card className="border border-default-200 bg-background/90 shadow-sm">
            <Card.Content className="space-y-4 p-6">
              <div className="flex items-center gap-2">
                <LuBadgeCheck className="size-5 text-success" />
                <h3 className="text-base font-semibold text-foreground">
                  Activity Feed
                </h3>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex size-2 rounded-full bg-success" />
                  <p className="text-sm text-foreground/80">
                    Your booking <span className="font-medium">BK-2901</span>{" "}
                    was confirmed 5 minutes ago.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex size-2 rounded-full bg-warning" />
                  <p className="text-sm text-foreground/80">
                    BMW X5 maintenance check is scheduled for tomorrow.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex size-2 rounded-full bg-primary" />
                  <p className="text-sm text-foreground/80">
                    A new user left a 5-star review on Tesla Model Y.
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex items-center gap-2 text-xs text-muted">
                <LuClock3 className="size-4" />
                Last sync 2 minutes ago
              </div>
            </Card.Content>
          </Card>
        </div>
      </section>
    </main>
  );
}
