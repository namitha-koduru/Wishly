# Prove Your Love 💌

A playful Valentine "prove your love" quiz built with React + Vite.

Flow: **Intro → 5 love questions → Flower Cat success → memory gallery → "Will you be my Valentine?" → celebration → replay.**
Answer a question wrong and Gun Cat shows up to tease you back to the same question.

This is the **base version** — functional and content-complete, styling/interaction
polish comes in a later pass.

## Run it

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Project structure

```
src/
  data/config.js          ← ALL editable content lives here:
                             questions, answers, correct answers,
                             wrong-answer lines, memories, copy/text
  components/
    Intro.jsx              ← opening screen
    Question.jsx           ← question + video + answers + shake feedback
    WrongAnswer.jsx         ← Gun Cat overlay ("Wrong 😾 Try again")
    Success.jsx            ← Flower Cat celebration after all 5 correct
    MemoryGallery.jsx       ← memory photo grid
    FinalQuestion.jsx      ← "Will you be my Valentine?" (dodging no-button)
    Celebration.jsx        ← final romantic celebration + replay
    VideoBlock.jsx          ← reusable muted/autoplay/loop video w/ fallback
    CatImage.jsx             ← reusable character image w/ emoji fallback
    FloatingHearts.jsx       ← decorative floating hearts/confetti effect
  App.jsx                  ← state machine driving the whole flow
  App.css / index.css      ← styling (cream / soft pink / burgundy palette)
```

## Adding your real assets

Drop files into `public/assets/` using these exact names and the app will
pick them up automatically — no code changes needed:

```
public/assets/cats/gun-cat.png
public/assets/cats/flower-cat.png
public/assets/videos/question-1.mp4  ... question-5.mp4
public/assets/memories/memory-01.jpg ... memory-05.jpg
```

Until real files are added, the app gracefully falls back to emoji /
placeholder blocks instead of showing broken media.

## Editing content

Everything text/content-related — the 5 questions, their answer choices,
which answer is correct, the teasing "wrong" lines, memory captions, and
all on-screen copy — is in `src/data/config.js`. Change it there and the
whole app updates.
