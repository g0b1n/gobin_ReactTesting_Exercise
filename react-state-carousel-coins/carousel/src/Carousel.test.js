import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // move backward in the carousel
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();
});

// Smoke Test
it("should render carousal", () => {
  const dummyImg = [
    { src: "hppts://bestImage.com/img1.jpg", caption: "img1"},
    { src: "hppts://bestImage.com/img2.jpg", caption: "img2"}
  ]
  render(<Carousel photos={dummyImg} title="testing"/>)
})

// Snapshot Test
it("should match the snapshot", () => {
  const dummyImg = [
    { src: "hppts://bestImage.com/img1.jpg", caption: "img1"},
    { src: "hppts://bestImage.com/img2.jpg", caption: "img2"}
  ]
  const { asFragment } = render(<Carousel photos={dummyImg} title="testing" />);
  expect(asFragment()).toMatchSnapshot()
})


// Testing if the Arrows are hidden or not

// Test if left arrow is hidden when on 1st img
it("hides left arrow when on the first img", function() {
  const {queryByTestId} = render(
    <Carousel
    photos={TEST_IMAGES}
    title="testing imgs"
    />
  );

  // check if the left arrow is hidden from DOM
  const leftArrow = queryByTestId('left-arrow');
  expect(leftArrow).not.toBeInTheDocument();
});

// Test if right arrow is hideen when on last img
it("hides right arrow when on the last image", function() {
  const { container, queryByTestId } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  // move to last img
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  for (let i = 0; i < TEST_IMAGES.length - 1; i++) {
    fireEvent.click(rightArrow);
  }

  // check if the right arrow is hidden when on the last img
  const lastImageRightArrow = queryByTestId("right-arrow");
  expect(lastImageRightArrow).not.toBeInTheDocument();
});