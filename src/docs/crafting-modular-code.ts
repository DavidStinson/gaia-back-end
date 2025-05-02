const craftingModularCode = `
<h1>
  <span class="headline">Modularization Documentation</span>
  <span class="subhead">Style Guide - Modular Code</span>
</h1>

This document provides a collection of standards specifically around code and other technical content to help build a more consistent and internally coherent modular product. These guidelines should be followed for all technical modular content.

Find what you need quickly using the links below to jump to what you need in this doc.

## Contents

- Data in code
  - Inclusion
  - Clarity
- Code blocks
  - Providing context in comments
- Code details
  - Quotes
  - Line length
  - Variable names
  - Semicolons
  - Bash/Shell code
- GitHub
- Directory structure
- Assets in student work
- File names
- JavaScript Specific Code Style
  - Declaration
  - Spacing

## Data in code

You must make specific considerations when creating data to be used in code.

### Inclusion

When crafting examples in code for core content, aim to satisfy these requirements in order of importance:

- Brevity
- Diversity
- Popularity
- Recency

For example, if you were crafting an array of movies, you should aim for popular movies and franchises with short names released in the last ten years. The array as a whole should display a diverse set of characters, stories, and genres. The names must be short to ensure that the point of the lesson isn't lost by having students be overly concerned with typing long words.

Don't forget the overriding characteristic: brevity. While **Everything Everywhere All at Once** satisfies the need to be diverse, popular, and recent, some students may fall behind while writing it out. Those needs do not override the requirement to set students up for academic success.

> 🎉 The goal is for every student in a classroom to be engaged with the theme of our content and not feel excluded by curriculum choices.

These are good goals to aim for in a live setting but do not override the priority of being genuine and creating connections in your classroom.

---

### Clarity

When modeling data, avoid potentially confusing property names. For example:

javascript
const todos = [
  {todo: 'Feed Dogs', done: true},
  {todo: 'Learn Express', done: false},
  {todo: 'Buy Milk', done: false}
];


When this data is iterated over, it will likely result in todo.todo being used, which could be awkward and confusing for students (and this also isn’t a descriptive property name). Opt for data that looks something like this option instead:

javascript
const todos = [
  {text: 'Feed Dogs', done: true},
  {text: 'Learn Express', done: false},
  {text: 'Buy Milk', done: false}
];


---

## Code blocks

Code blocks must be language labeled; see the [highlight.js docs](https://highlightjs.readthedocs.io/en/latest/supported-languages.html) for a list of valid languages.

Do not use anything in code blocks that is not valid code. For example, to demonstrate that more code belongs between two pieces of code in the same file, use a comment:

javascript

import Movie from '../models/movie.js'

// more code is here!

// Do not do something like the following:
.
.
.
// Do not do the above!

function edit(req, res) {
  // edit function code
}


Breaking the one code block into two is even more ideal than the above.

### Code block file paths

**Purpose**: File paths should be placed above a code block to indicate the file that the code belongs in. For example:

my/file/path

javascript
console.log("Wow, so cool! I love file paths 🥰")


To do this write this code:

markdown
my/file/path

javascript
console.log("Wow, so cool! I love file paths 🥰")


This uses native markdown and relies on a post-processor for styling. Just wrap the file path inside of an inline code block (  ) on its own line (nothing else can be on this line!) immediately before any code block.

### Providing context in comments

Ensure code snippets provide context to help learners understand the operations being performed.

When applicable, show the expected output or call out the data held in a variable after a line of code is executed. Avoid using symbols or anything that could be confused as code for this - prefer written language instead. For example:

javascript
const movies = ['Barbie', 'Interstellar', 'Get Out'];

const firstMovie = movies[0];
// firstMovie is 'Barbie'


When something is logged to the console use the phrase Prints: whatever is printed. For example:

javascript
function printBanner(text) {
  console.log('========================');
  console.log(text);
  console.log('========================');
}

printBanner('We can make this banner say anything!');

// Prints:
// ========================
// We can make this banner say anything!
// ========================


---

## Code details

### Quotes

Prefer ' in code instead of ", except when " is preferred by the language - for example, with HTML or Java.

---

### Line length

Lines of code in code blocks should never be longer than 80 characters.

---

### Variable names

Do not use single letter variable names ever. Beyond this, prefer more descriptive variable names without being excessively verbose.

Use camelCase or PascalCase when appropriate in JavaScript. Use snake_case or SCREAMING_SNAKE_CASE when appropriate in Python.

Avoid shorthand that isn't ubiquitous - for example, using err instead of error is acceptable.

---

### Semicolons

End lines with semicolons in languages that will allow it.

---

### Bash/Shell code

Bash and shell code should not include leading indicators such as $ or # to ease copying content.

---

## GitHub

GitHub repository names should be kebab-cased.

---

## Directory structure

All students in tech verticals are expected to maintain a standard directory structure as described below:

Students will all have a code directory inside of their user root directory with a ga directory inside of it.

Inside of ~/code/ga, students will have these directories:

- labs - For all lab assignments. Students/instructors may decide to further divide lecture content into weeks, units, or topics covered, but this is ultimately up to those parties.
- lectures - For all class lectures. Students/instructors may decide to further divide lecture content into weeks, units, or topics covered, but this is ultimately up to those parties.
- projects - For any large projects done in a course.
- sandbox - For quick experimentation.

> This may be different outside of the tech vertical. Check with your onboarding point of contact.

---

## Assets in student work

All multimedia assets in student projects should be organized in an assets directory.

---

## File names

Ensure all file names use kebab-case for consistency and ease of reference.

## JavaScript Specific Code Style

### Declaration

Variables in JavaScript should not be declared with var.

---

### Spacing

Always use a 2-space indentation in your code.

---
`

export default craftingModularCode
