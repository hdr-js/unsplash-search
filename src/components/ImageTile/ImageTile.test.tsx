import React, { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ImageTile from "./ImageTile";
import { Basic } from "unsplash-js/dist/methods/photos/types";

import { act } from "@testing-library/react";

// Return true if the supplied value is an async function; otherwise, return
// false
function isAsyncFunction(value: any): boolean {
  return Object.prototype.toString.call(value) === "[object AsyncFunction]";
}

// Retrieve the nearest (i.e. outermost) client component in the component tree
// represented by the given JSX node
async function getNearestClientComponent(node: JSX.Element) {
  if (!isAsyncFunction(node.type)) {
    return node;
  }
  const nodeReturnValue = await node.type({ ...node.props });
  return getNearestClientComponent(nodeReturnValue);
}

// Follow <https://github.com/testing-library/react-testing-library/issues/1209>
// for the latest updates on React Testing Library support for React Server
// Components (RSC)
export async function renderServerComponent(node: JSX.Element) {
  await act(async () => {
    render(await getNearestClientComponent(node));
  });
}
const mockPhoto: Basic = {
  id: "testId",
  created_at: "2023-11-19T12:00:00Z",
  updated_at: "2023-11-19T12:00:00Z",
  width: 1200,
  height: 800,
  color: "#abcdef",
  blur_hash: "testBlurHash",
  likes: 50,
  description: "Test description",
  alt_description: "Alt description",
  promoted_at: "test",
  urls: {
    raw: "https://example.com/raw",
    full: "https://example.com/full",
    regular: "https://example.com/regular",
    small: "https://example.com/small",
    thumb: "https://example.com/thumb",
  },
  links: {
    self: "https://api.unsplash.com/photos/testId",
    html: "https://unsplash.com/photos/testId",
    download: "https://unsplash.com/photos/testId/download",
    download_location: "https://api.unsplash.com/photos/testId/download",
  },
  user: {
    id: "testUserId",
    updated_at: "2023-11-19T12:00:00Z",
    username: "testuser",
    first_name: "Test",
    last_name: "User",
    name: "Test User",
    portfolio_url: "https://example.com/portfolio",
    profile_image: {
      small: "https://api.unsplash.com/photos/testId",
      medium: "https://api.unsplash.com/photos/testId",
      large: "https://api.unsplash.com/photos/testId",
    },
    bio: "Test bio",
    location: "TestLocation",
    total_likes: 10,
    total_photos: 20,
    total_collections: 5,
    instagram_username: "testinstagram",
    twitter_username: "testtwitter",
    links: {
      self: "https://api.unsplash.com/users/testuser",
      html: "https://unsplash.com/testuser",
      photos: "https://api.unsplash.com/users/testuser/photos",
      likes: "https://api.unsplash.com/users/testuser/likes",
      portfolio: "https://api.unsplash.com/users/testuser/portfolio",
      followers: "https://api.unsplash.com/users/testuser/portfolio",
      following: "https://api.unsplash.com/users/testuser/portfolio",
    },
  },
};

jest.mock("../UserPortfolio/UserPortfolio.tsx", () => {
  const UserPortfolio = (props: { user: { id: number } }) => {
    return (
      <div>
        <span>{props.user.id}</span>
      </div>
    );
  };
  return UserPortfolio;
});

describe("ImageTile Component", () => {
  it("renders image tile with photo details", async () => {
    await renderServerComponent(<ImageTile photo={mockPhoto} />);

    // Check if the image is rendered with correct attributes
    const imageElement = screen.getByAltText("Test Image");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute(
      "src",
      "https://example.com/image.jpg"
    );

    // Check if user details are rendered
    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument(); // Likes count

    // Check if tags are rendered
    expect(screen.getByText("Landscape")).toBeInTheDocument();
    expect(screen.getByText("Nature")).toBeInTheDocument();
  });

  it("handles hover interaction", () => {
    render(<ImageTile photo={mockPhoto} />);

    // Check if the overlay is initially not visible
    const overlayElement = screen.getByTestId("overlay");
    expect(overlayElement).toHaveStyle({ opacity: 0 });

    // Trigger hover event
    userEvent.hover(screen.getByTestId("image-tile"));

    // Check if the overlay becomes visible on hover
    expect(overlayElement).toHaveStyle({ opacity: 100 });
  });
});
