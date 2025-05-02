const markdownDocumentStructure = `
<h1>
  <span class="headline">Modularization Documentation</span>
  <span class="subhead">Style Guide - Markdown Document Structure</span>
</h1>

This document provides a collection of standards for document structure and formatting to ensure a consistent and coherent representation of our product. We can achieve uniformity across all our written assets by adhering to these guidelines.

Find what you need quickly using the links below to jump to what you need in this doc.

## Contents

- Headings
  - Casing
- Lists
- Callouts
- General Markdown Guidelines
  - Relative Paths
  - Placeholder text
  - Spacing
- Formatting inline text
  - Variables or short lines of code
  - Properties or methods
  - Directories, file names, and file paths
  - URLs and URIs
  - Keyboard shortcuts
  - UI Interactions
  - Terms and definitions
  - Adding emphasis

## Headings

All documents should start with a [hero banner](../component-library/heroes.md). There will never be another hero banner or h1 heading in a document ever.

h2-h4 headings are written in sentence case (see the [Casing](#casing) section below).

h2 headings (## in markdown) break up the big ideas of the document.

h3 headings (### in markdown) break big ideas into smaller sections when necessary.

h4 headings (#### in markdown) are discouraged and often signal poor document structure. h5 and h6 headers are not allowed.

Headings should never directly follow one another. This indicates a poor document structure or a lack of breadcrumbing. Add some written copy or an asset between them.

Microlesson content shouldn't have a table of contents. Consider adding one in other documents only if necessary.

Do not skip heading levels. For example, an h4 shouldn't follow an h2.

### Casing

Use sentence style casing (capitalize the first letter of a sentence and any proper nouns) for almost all copy, excluding the h1 of a document, which should use title casing in AP Style.

You should use a tool like [Capitalize My Title](https://capitalizemytitle.com/style/ap) to format titles in AP Style because the details are frankly silly.

---

## Lists

Lists should contain two or more items. Lists should actually be lists, not content that would otherwise be paragraphs formatted as lists. In general, list items with four or fewer words do not need ending punctuation, but if any list item requires ending punctuation, all list items should have ending punctuation.

List items should start with a - character, and an empty line in markdown should exist before and after a list. For example:

This is my list of lists:

- My list
- Your list
- Our list

The above example is created with this markdown:

markdown
This is my list of lists:

- My list
- Your list
- Our list



---

## Callouts

Callouts should be placed inside of the blockquote element >.

Use Callouts sparingly to maximize impact. These emojis should be used at the start of a callout for consistency:

🤯 - Something mind-blowing.

🧠 - Denotes content that wrinkles your brain. Use this to flag another way to do something or a more advanced way of writing a preceding code block.

💡 - A light bulb moment! Use this to make connections you want to make an impact with.

🏆 - Indicates a best practice

⚠ - A topic you want to urge caution about. Pay attention when you're doing this, or something may go wrong.

🚨 - A topic that requires complete and urgent attention. Use sparingly. Pay attention to this, or something will absolutely go wrong

❓ - A stand-alone single review question.

♻️ - Denotes information that can be used to construct a mental model around - either steps that can be repeated or patterns that are commonly used.

📚 - Defines a term used in the previous block. The term should be *italicized* in that block and *italicized* in the definition.

😎 - Play it cool. Use this to provide context around a piece of complicated code or keep the calm during a complex process.

Here is an example:

> 🏆 Callouts should begin with an emoji!

And another:

> 😎 You don't need to memorize these; this documentation is always here.
>
> The more you write, the less you'll need to reference this document.

And another:

> 💡 Speaking of that, have you bookmarked this page yet?

The above examples are created with this markdown:

markdown
Here is an example:

> 🏆 Callouts should begin with an emoji!

And another:

> 😎 You don't need to memorize these; this documentation is always here.
>
> The more you write, the less you'll need to reference this document.

And another:

> 💡 Speaking of that, have you bookmarked this page yet?


---

## General Markdown guidelines

### Relative paths

When navigating within a project, use the full relative path. For example, if linking to a file in an assets directory, opt for ./assets/file.png instead of assets/file.png, as shown here:

markdown
![MongoDB Atlas walkthrough](./assets/ui-interaction-text.png)


This helps ensure content doesn't break if it is ever ported off of GitHub.

---

### Placeholder text

Use the text **tktk** ([common in publishing](https://en.wikipedia.org/wiki/To_come_(publishing))) and a short note as a placeholder for forthcoming work. All documents should be searched for this placeholder before they are published.

---

### Spacing

Add a line of whitespace between each markdown element.

Do not use double spaces after punctuation.

---

## Formatting inline text

The following rules apply to formatting inline text.

### Variables or short lines of code

Place the variable name or short line of code in an *inline code block*. For example:

Create an array named movies containing the titles of three of your favorite movies as strings.

The above example is created with this markdown:

markdown
Create an array named movies containing the titles of three of your favorite movies as strings.


---

### Properties or methods

How you refer to properties or methods in copy will change depending on the context, but they'll always be wrapped in an *inline code block*. When required for clarity, you should include the object a property or method belongs to. For example:

The color of the car is stored on car.color. Start the car with the car.start() method.

The above example is created with this markdown:

markdown
The color of the car is stored on car.color. Start the car with the car.start() method.


Sometimes, adding the object will be unnecessary or even confusing, like when talking about a generic property or method on a data type. In this case, leave it off. For example:

Access the last element in an array with the classic length property.

Or use one of the more recent additions to JavaScript - the at() method.

The above example is created with this markdown:

markdown
Access the last element in an array with the classic length property

Or use one of the more recent additions to JavaScript - the at() method.


Note that there is no . before the method name, but it is followed by (). We also directly call it a method in the copy. This provides enough context to determine that it is a method.

---

### Directories, file names, and file paths

Directories, file names, and file paths in copy should be wrapped in an *inline file path component*. For example:

Open your Terminal application and navigate to your <code class="filepath">~/code/sei/lectures</code> directory.

Make a new directory called <code class="filepath">js-arrays</code>, then enter this directory.

Then, create an <code class="filepath">app.js</code> and an <code class="filepath">index.html</code> file.

The above example is created with this markdown/HTML:

markdown
Open your Terminal application and navigate to your <code class="filepath">~/code/sei/lectures</code> directory.

Make a new directory called <code class="filepath">js-arrays</code>, then enter this directory.

Then, create an <code class="filepath">app.js</code> and an <code class="filepath">index.html</code> file.


See the [inline file paths](../component-library/inline-text-components.md#inline-file-paths) documentation for more details on using the *inline file path component*.

---

### URLs and URIs

URLs and URIs should both be wrapped in inline code blocks. URLs should also include a link to that location. For example:

Navigate to <http://localhost:3000>

You can use Google by going to <https://google.com>

In your app, create a /movies route.

The above example is created with this markdown:

markdown
Navigate to <http://localhost:3000> 

(NOTE: You could also use [http://localhost:3000](http://localhost:3000) 
above to achieve the same result. Both are valid in the style guide/markdown)

You can use Google by going to <https://google.com>

(NOTE: You could also use [https://google.com](https://google.com) above
to achieve the same result. Both are valid in the style guide/markdown)

In your app, create a /movies route.


You typically shouldn't use a URL in copy; use an aliased link where possible. Only write out a full URL as shown above if it makes sense in the context of your work.

---

### Keyboard shortcuts

Keyboard shortcuts should be wrapped in an *inline keyboard keys component*. Keyboard letters should be capitalized. When keyboard shortcuts are provided, they must be supplied for all of the operating systems we expect in cohorts. For example:

- Use <kbd>Command</kbd> + <kbd>Shift</kbd> + <kbd>4</kbd> to take a screenshot on macOS.
- In Windows, use <kbd>Windows</kbd> + <kbd>Shift</kbd> + <kbd>S</kbd>.
- In Ubuntu, use <kbd>Shift</kbd> + <kbd>Print</kbd>.

The above example is created with this markdown:

markdown
- Use <kbd>Command</kbd> + <kbd>Shift</kbd> + <kbd>4</kbd> to take a screenshot on macOS.
- In Windows, use <kbd>Windows</kbd> + <kbd>Shift</kbd> + <kbd>S</kbd>.
- In Ubuntu, use <kbd>Shift</kbd> + <kbd>Print</kbd>.


See the [inline keyboard keys](../component-library/inline-text-components.md#inline-keyboard-keys) documentation for more details on using the *inline keyboard keys component*.

---

### UI Interactions

When giving directions for interacting with UI elements, use *bold text* to indicate the content of that element.

Using the following screenshot as an example, here's a matching caption:

![MongoDB Atlas walkthrough steps](./assets/ui-interaction-buttons.png)

In the sidebar, click the **Database** option under the **DEPLOYMENT** header.

Then click the **Browse Collections** button.

The above example is created with this markdown:

markdown
In the sidebar, click the **Database** option under the **DEPLOYMENT** header. 

Then click the **Browse Collections** button.


When instructing students to type text - for example, to fill out a form - use *inline code blocks*.

Using the following screenshot as an example, here's a matching caption putting these two ideas together:

![MongoDB Atlas walkthrough](./assets/ui-interaction-text.png)

Enter 0.0.0.0/0 in the **IP Address** field and Anywhere in the **Description** field.

Then click the **Add Entry** button.

The above example is created with this markdown:

markdown
Enter 0.0.0.0/0 in the **IP Address** field and Anywhere in the **Description** field.

Then click the **Add Entry** button.


---

### Terms and definitions

New terms that will be defined in a callout (see the [Callouts section](#callouts)) should be identified inline with *italicized text*. The word should also be *italicized* in the accompanying callout. For example:

Arrays can contain zero or more items called *elements*.

> 📚 An *element* is an individual item stored at a specific position within an array.

The above example is created with this markdown:

markdown
Arrays can contain zero or more items called *elements*.

> 📚 An *element* is an individual item stored at a specific position within an array.


---

### Adding emphasis

When you'd like to add emphasis, use *bold and italicized text*. This should be done sparingly. For example:

If you click the red button, bad things will happen. ***Do not click the red button.***

The above example is created with this markdown:

markdown
If you click the red button, bad things will happen. ***Do not click the red button.***


> Formatting note: Wrap bold text in **; for example, **this text should be bold**. Wrap italicized text in *; for example, *this text should be italicized*. Wrap bold and italicized text in ***; for example, ***this text should be bold and italicized***.
`

export default markdownDocumentStructure
