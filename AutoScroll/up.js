(function () {
  const DOWN_MAXIMUM_NUMBER_OF_TRIALS = 50;
  const MINIMUM_SLEEPING_TIME_IN_MS = 500;
  const MAXIMUM_SLEEPING_TIME_IN_MS = 1000;
  const SCROLL_DISTANCE = window.innerHeight * 50; // Set the scroll distance to twice the height of the viewport

  let isScrolling = true; // Variable to track if scrolling should continue

  const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
  const randomNumber = (minimum, maximum) =>
    Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

  const autoScrollUp = async () => {
    const MAXIMUM_NUMBER_OF_TRIALS = 50; // Define MAXIMUM_NUMBER_OF_TRIALS within the function

    let currentScrollPosition = window.pageYOffset;
    let numberOfScrolls = 0;
    let numberOfTrials = 0;

    while (
      numberOfTrials < MAXIMUM_NUMBER_OF_TRIALS &&
      isScrolling &&
      currentScrollPosition > 0
    ) {
      window.scrollBy(0, -SCROLL_DISTANCE); // Scroll up by the defined scroll distance

      await sleep(randomNumber(MINIMUM_SLEEPING_TIME_IN_MS, MAXIMUM_SLEEPING_TIME_IN_MS));

      const newScrollPosition = window.pageYOffset;

      if (currentScrollPosition === newScrollPosition) {
        numberOfTrials++;
        console.log(
          `Is it already the top of the infinite scroll? ${
            MAXIMUM_NUMBER_OF_TRIALS - numberOfTrials
          } trials left.`
        );
      } else {
        numberOfTrials = 0;
        numberOfScrolls++;
        console.log(`The scroll up #${numberOfScrolls} was successful!`);
      }

      currentScrollPosition = newScrollPosition;
    }

    if (isScrolling) {
      console.log('We should be at the top of the infinite scroll! Congratulations!');
      console.log(`${numberOfScrolls} scrolls were needed to load all results!`);
    } else {
      console.log('Scrolling stopped by the user.');
    }
  };

  chrome.runtime.onMessage.addListener((message) => {
    if (message.action === 'stopScrolling') {
      isScrolling = false;
    }
  });

  autoScrollUp();
})();
