# Unsplash Search

## Demo

Check out the live demo [here](https://unsplash-search-e4hdblcqa-https-haiderali.vercel.app/)!

<iframe src="https://unsplash-search-e4hdblcqa-https-haiderali.vercel.app/" width="100%" height="500px" frameborder="0" scrolling="no"></iframe>

## Overview

Allowing users to search for images using a keyword search, user will see the a paginated grid of images based on there search. Further more, it can filter images based on the color and also sort them, being relevant or latest first. By default user will see a default list of (latest/trending) images provided by Unsplash API.

## Features

#### 1. Image Grid

- Providing the user a super easy experiencing to see image results from unsplash in a fancy grid, it is using a responsive approach to show column with images in a vertical stream. This allows no cropping, no scaling and no pixelation of raster images. Grid is mobile friendly and adjust the columns according to the devices using.

#### 2. Search Functionality

- User is provided with an experience to type and search for images. The search works with debounce, so it will search after 500ms of user typing something. No need to press enter or click any button.

#### 3. Image Tile

- Image tile will use the background color that is provided by the unsplash api as the most used color in the picture. Image tile has a hover feature to provide further insights about creator, like and tags on a particular image.

#### 4. No Results Handling

- Clear indication in the UI, when there are no images found for the particular search.

#### 5. Filter by Color

- Users can filter their search results by a specific color. Unsplash API returns a filtered set of images using the selected color. The dropdown menu provides a list of all available color options that unsplash-api allows.

#### 6. Sort by Latest

- Users can sort the search results by the latest or relevant images first, This can be controlled via a dropdown. By default it will show relevant images first.

#### 7. Pagination

- User can use the pagination control on both top and bottom of the image grid to their convenience to browse through different pages. The page size is fixed to be 20 images per page. User can navigate to first, last, next and previous pages with one click.

#### 8. Search sharing

- All; search, filter, sort and pagination controls are in sync with the URL params. This makes the URL easy to share with the another user to see exactly the same search results.

## Technologies Used

- **TypeScript:** For type-safe and scalable JavaScript development.
- **Next.js 14:** A React framework for building server-rendered applications.
- **Tailwind CSS:** A utility-first CSS framework for designing modern and responsive interfaces.
- **Pagination:** rc-pagination for a custom-css based React controlled component for pagination.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Problems & Assumptions:

#### 1. No sort and filter without search:

- As provided in the UX, sort and filter controls are both disabled for the user unless the user searches something. The API provided in unsplash-js SDK to get the images without any search keyword doesn't allow to provide filter and sort values in the request. You can only pass in the pagination params. When a user searches for something the API supports the params for filter an sort.

#### 2. User cant access more than 4000 record:

- Unsplash-api restricts, to access more than 4000 records, maybe it is a basic/free plan thing for the ACCESS_KEY. So in the UX, the application caps the total records count provided by the API to 4000, so the pagination control can stop at 200. access unsplash-api with pageNumber greater than 200 gives server error.

#### 2. No tags without search:

- Unsplash-api responds with a different Photo object white requesting with or without search. There is already an issue logged in their github project repository.

## Improvements:

- Infinite Scroll can be implemented using server actions, I tried but there was weird error on the usage of server actions in client component not permissable. I dug a lot. but retracted to this simple pagination.
- Tailwind could be used a little more intelligently, using variable of maybe constructing a theme for colors, sizes and spacings etc.
- Defining more and and more error boundaries for the server api call. Currently if the calls to unsplash-api fails it provides the default white screen by next js with a error message of a run time error on server application.
- Using the unsplash endpoint instead of SDK to have a little more control on the types and response values.
- Library rc-pagination was not a very feasible to opt, it cluttered the global.css file with all the internal classes we are overriding.
- Could've been test a little more with some mock apis and pagination action events in detail.
- Honestly lots more to improve along with lots to learn on this new next 13 architecture.

## Review

There is a demo link provided on top to see the application running and the code
