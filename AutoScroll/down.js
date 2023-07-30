(function () {
  const DOWN_MAXIMUM_NUMBER_OF_TRIALS = 50;	
  const MINIMUM_SLEEPING_TIME_IN_MS = 1000;
  const MAXIMUM_SLEEPING_TIME_IN_MS = 2000;

  let isScrolling = true; // Variable to track if scrolling should continue

  const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
  const randomNumber = (minimum, maximum) =>
    Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

  const autoScrollDown = async () => {
    const MAXIMUM_NUMBER_OF_TRIALS = 50; // Define MAXIMUM_NUMBER_OF_TRIALS within the function

    let currentScrollHeight = 0;
    let numberOfScrolls = 0;
    let numberOfTrials = 0;

    while (numberOfTrials < MAXIMUM_NUMBER_OF_TRIALS && isScrolling) {
      currentScrollHeight = document.documentElement.scrollHeight;

      window.scrollTo(0, currentScrollHeight);

      await sleep(randomNumber(MINIMUM_SLEEPING_TIME_IN_MS, MAXIMUM_SLEEPING_TIME_IN_MS));

      if (currentScrollHeight === document.documentElement.scrollHeight) {
        numberOfTrials++;
        console.log(
          `Is it already the end of the infinite scroll? ${
            MAXIMUM_NUMBER_OF_TRIALS - numberOfTrials
          } trials left.`
        );
      } else {
        numberOfTrials = 0;
        numberOfScrolls++;
        console.log(`The scroll down #${numberOfScrolls} was successful!`);
      }
    }

    if (isScrolling) {
      console.log('We should be at the bottom of the infinite scroll! Congratulations!');
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

  autoScrollDown();
})();

