import { auth } from "@/app/lib/auth";
import { getUserDetails } from "@/app/lib/datafetch";
import UpdateProfile from "@/components/utlis/UpdateProfile";
import { Card, Chip } from "@heroui/react";
import { headers } from "next/headers";
import Image from "next/image";

// const highlights = [
//   { id: "Luxury Cars", label: "Luxury Cars" },
//   { id: "Exotic Cars", label: "Exotic Cars" },
//   { id: "Sports Cars", label: "Sports Cars" },
//   { id: "Classic Cars", label: "Classic Cars" },
//   { id: "SUVs", label: "SUVs" },
//   { id: "Convertibles", label: "Convertibles" },
// ];

// const badge = [
//   { id: "verified-host", label: "Verified Host" },
//   { id: "car-enthusiast", label: "Car Enthusiast" },
//   { id: "traveler", label: "Traveler" },
//   { id: "road-trip-lover", label: "Road Trip Lover" },
//   { id: "luxury-cars", label: "Luxury Cars" },
//   { id: "top-rated", label: "Top Rated" },
//   { id: "friendly", label: "Friendly" },
//   { id: "quick-responder", label: "Quick Responder" },
//   { id: "safe-driver", label: "Safe Driver" },
//   { id: "premium-service", label: "Premium Service" },
//   { id: "reliable", label: "Reliable" },
//   { id: "adventure-seeker", label: "Adventure Seeker" },
// ];
// const tags = [
//   { id: "responsive", label: "Responsive" },
//   { id: "detail-oriented", label: "Detail-oriented" },
//   { id: "friendly", label: "Friendly" },
//   { id: "flexible", label: "Flexible" },
//   { id: "professional", label: "Professional" },
//   { id: "reliable", label: "Reliable" },
//   { id: "punctual", label: "Punctual" },
//   { id: "trustworthy", label: "Trustworthy" },
//   { id: "helpful", label: "Helpful" },
//   { id: "respectful", label: "Respectful" },
//   { id: "communicative", label: "Communicative" },
//   { id: "organized", label: "Organized" },
//   { id: "customer-focused", label: "Customer-focused" },
//   { id: "problem-solver", label: "Problem Solver" },
//   { id: "safety-first", label: "Safety First" },
//   { id: "easy-to-work-with", label: "Easy to Work With" },
//   { id: "well-maintained", label: "Well Maintained" },
//   { id: "quick-responder", label: "Quick Responder" },
//   { id: "experienced-host", label: "Experienced Host" },
//   { id: "verified-host", label: "Verified Host" },
// ];

export default async function ProfilePage() {
  // const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const ownerId = session.user.id;
  // console.log("Owner ID:", ownerId);
  const userDetails = await getUserDetails(ownerId);
  // console.log("User Details:", userDetails);
  const {
    name,
    email,
    phone,
    location,
    language,
    headline,
    about,
    badge,
    highlights,
    tags,
  } = userDetails || {};

  return (
    <section className="w-full py-4 sm:py-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-semibold text-foreground">
              My Profile
            </h1>
            <p className="text-sm text-muted">
              Keep your public details polished and up to date.
            </p>
          </div>

          <UpdateProfile data={userDetails} />
        </div>

        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <Card className="overflow-hidden border border-default-200 bg-background/80 p-0 shadow-sm">
            <Card.Content className="flex flex-col items-center gap-5 p-8 text-center">
              <div className="relative h-32 w-32 overflow-hidden rounded-full ring-4 ring-primary/10">
                <Image
                  src="/assets/images/slider-image1.jpg"
                  alt="Profile avatar"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <h2 className="text-xl font-semibold text-foreground">
                    {name || "User"}
                  </h2>
                  <Chip color="success" size="sm" variant="flat">
                    Verified
                  </Chip>
                </div>
                <p className="text-sm text-muted">
                  Luxury car enthusiast • Host • Traveler
                  {}
                </p>
                <p className="text-sm leading-6 text-foreground/70">
                  {headline || "No headline provided."}
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                {badge?.map((item) => (
                  <Chip key={item.id} color="primary" size="sm" variant="flat">
                    {item.label}
                  </Chip>
                ))}
              </div>
            </Card.Content>
          </Card>

          <div className="space-y-6">
            <Card className="border border-default-200 bg-background/80 shadow-sm">
              <Card.Header className="flex items-center justify-between px-6 pt-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Personal information
                  </h3>
                  <p className="text-sm text-muted">
                    Your core profile details at a glance.
                  </p>
                </div>
              </Card.Header>

              <Card.Content className="grid gap-5 p-6 md:grid-cols-2">
                {highlights?.map((item) => (
                  <div key={item.label} className="space-y-1">
                    <p className="text-sm font-medium text-foreground/70">
                      {item.label}
                    </p>
                    <p className="text-sm text-foreground">{item.value}</p>
                  </div>
                ))}
              </Card.Content>
            </Card>

            <Card className="border border-default-200 bg-background/80 shadow-sm">
              <Card.Header className="px-6 pt-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {`About ${name || "User"}`}
                  </h3>
                  <p className="text-sm text-muted">
                    {`A brief description about ${name || "the user"}.`}
                  </p>
                </div>
              </Card.Header>

              <Card.Content className="space-y-4 p-6">
                <p className="text-sm leading-7 text-foreground/80">
                  {about || "No description provided."}
                </p>
                <div className="flex flex-wrap gap-2">
                  {tags?.map((tag) => (
                    <Chip key={tag.id} size="sm" variant="flat">
                      {tag.label}
                    </Chip>
                  ))}
                </div>
              </Card.Content>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
