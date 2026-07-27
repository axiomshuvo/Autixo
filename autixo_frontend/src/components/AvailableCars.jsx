import { getRandomCars } from "@/lib/datafetch";
import { Avatar, Card } from "@heroui/react";

export default async function AvailableCars() {
  const randomCars = await getRandomCars();
  console.log(randomCars);

  return (
    <div className="container mx-auto my-20">
      <h2 className="text-4xl font-semibold">Available Cars</h2>
      <p className="text-lg text-gray-300">
        Instant Online Approval, Fast and Free
      </p>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <Card className="">
          <img
            alt="AI Builders community"
            className="pointer-events-none aspect-square w-14 rounded-2xl object-cover select-none"
            loading="lazy"
            src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo2.jpg"
          />
          <Card.Header>
            <Card.Title>AI Builders</Card.Title>
            <Card.Description>362 members</Card.Description>
          </Card.Header>
          <Card.Footer className="flex gap-2">
            <Avatar aria-label="John's profile picture" className="size-5">
              <Avatar.Image
                alt="John's avatar - blue themed"
                src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg"
              />
              <Avatar.Fallback className="text-xs">B</Avatar.Fallback>
            </Avatar>
            <span className="text-xs">By John</span>
          </Card.Footer>
        </Card>
        <Card className="">
          <img
            alt="AI Builders community"
            className="pointer-events-none aspect-square w-14 rounded-2xl object-cover select-none"
            loading="lazy"
            src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo2.jpg"
          />
          <Card.Header>
            <Card.Title>AI Builders</Card.Title>
            <Card.Description>362 members</Card.Description>
          </Card.Header>
          <Card.Footer className="flex gap-2">
            <Avatar aria-label="John's profile picture" className="size-5">
              <Avatar.Image
                alt="John's avatar - blue themed"
                src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg"
              />
              <Avatar.Fallback className="text-xs">B</Avatar.Fallback>
            </Avatar>
            <span className="text-xs">By John</span>
          </Card.Footer>
        </Card>
        <Card className="">
          <img
            alt="AI Builders community"
            className="pointer-events-none aspect-square w-14 rounded-2xl object-cover select-none"
            loading="lazy"
            src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo2.jpg"
          />
          <Card.Header>
            <Card.Title>AI Builders</Card.Title>
            <Card.Description>362 members</Card.Description>
          </Card.Header>
          <Card.Footer className="flex gap-2">
            <Avatar aria-label="John's profile picture" className="size-5">
              <Avatar.Image
                alt="John's avatar - blue themed"
                src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg"
              />
              <Avatar.Fallback className="text-xs">B</Avatar.Fallback>
            </Avatar>
            <span className="text-xs">By John</span>
          </Card.Footer>
        </Card>
        <Card className="">
          <img
            alt="AI Builders community"
            className="pointer-events-none aspect-square w-14 rounded-2xl object-cover select-none"
            loading="lazy"
            src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo2.jpg"
          />
          <Card.Header>
            <Card.Title>AI Builders</Card.Title>
            <Card.Description>362 members</Card.Description>
          </Card.Header>
          <Card.Footer className="flex gap-2">
            <Avatar aria-label="John's profile picture" className="size-5">
              <Avatar.Image
                alt="John's avatar - blue themed"
                src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg"
              />
              <Avatar.Fallback className="text-xs">B</Avatar.Fallback>
            </Avatar>
            <span className="text-xs">By John</span>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
}
