# Javascript Testing Fundamentals

Learn testing principles and how to apply them to React applications using **Jest** and **Testing Library**.

---

Hi there! I'm [Sandrina Pereira](https://www.sandrina-p.net/) and I love refactoring code with the confidence that the app won't break. <!-- copyreview please. make it short. make it sweet -->

These are the material resources for my **JS Testing Workshop** <!-- TODO LINK -->

## Pre-Workshop requirements

To get the most out of the workshop, please do the following things in advance:

- **Install [Zoom](https://zoom.us)** to join the video call.
  - Turn on your video if possible, so we don't feel alone.
  - Keep your microphone muted to avoid background noises.
- **Install a modern browser**. Chrome or Firefox are recommended.
- **Setup the project** prior to the workshop to avoid unexpected installation issues.

The better prepared you are for the workshop, the more you will learn from it!

## Setup the project

### Installing

[Git](https://git-scm.com/) and [NodeJS](https://nodejs.org/en/) are required before proceding.

```bash
# Clone the repository
git clone https://github.com/sandrina-p/workshop-js-testing.git

# Go to workshop folder
cd workshop-js-testing

# Install the dependencies
npm install
```

### Quick Check-up

To ensure all's fine, please verify the following three things:

1. **App running:** Run `npm start`. The workshop app should start at http://localhost:1234
2. **Testing tooling:** Run `npm run checkup` and verify the [output matches this example](src/_checkup/checkup_output.png?raw=true).
3. **Linters integrations:** Integrate [ESLint](https://eslint.org/docs/user-guide/integrations) and [Prettier](https://prettier.io/docs/en/editors.html) in your editor. Then, restart your editor, open `src/_checkup/index.test.js` and follow the notes given with the ligh bulb emoji 💡 .

- Did everything work? _Ah-wesome!_ That's all, see you soon! 🤓
- Having troubles? [Open an issue](https://github.com/sandrina-p/workshop-js-testing/issues/new) or reach me at a.sandrina.p@gmail.com.

### Workshop Dynamic

The workshop consists in a set of challenges. Each one introduces a new topic, followed with a code challenges where you will have to apply the concepts learned.

```bash
src/
  challenges/  # Challenges
     *.md         # Exercise instructions
     *.test.js    # Where you'll be writing the tests!
  playgrounds/ # Code to be tested
  solutions/   # The final solutions for each challenge
```

In each exercise you'll find the lucky clover emoji 🍀 to guide you. I don't expected you to complete the entire code challenge on time. The goal is to introduce you to new things, **make you think about it and ask me questions** as we go through the content.

Here's a learning tip: **Check the solutions only as a last resource.** If you take a peek at the solution before even trying, you'll be sabotaging your own learning. It's okay to struggle while you solve the exercise. It's part of the learning proccess. :)

After each exercise we'll go through the solution together and clarify any question that might appear on the way.

<!--
## Workshop Feedback

Please take a couple of minutes to [give me your feedback](TODO-LINK), as it will help me improving the next editions of this workshop 🤗
-->

## License

This is only available for private, non-commercial use under the [GPL version 3](http://www.gnu.org/licenses/gpl-3.0-standalone.html).
