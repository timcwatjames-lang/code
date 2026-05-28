import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const coursesData = [
  {
    title: 'HTML Fundamentals',
    slug: 'html-fundamentals',
    description: 'Learn HTML from scratch. Master elements, forms, tables, semantic HTML, and best practices for building web pages.',
    language: 'HTML',
    level: 'BEGINNER',
    order: 1,
    published: true,
    lessons: [
      { title: 'Introduction to HTML', slug: 'intro-to-html', content: '# Introduction to HTML\n\nHTML (HyperText Markup Language) is the standard language for creating web pages.\n\n## What is HTML?\nHTML uses tags to structure content. Tags like `<h1>`, `<p>`, and `<div>` define headings, paragraphs, and containers.\n\n```html\n<!DOCTYPE html>\n<html>\n<head>\n  <title>My First Page</title>\n</head>\n<body>\n  <h1>Hello World!</h1>\n  <p>This is my first paragraph.</p>\n</body>\n</html>\n```\n\n## Key Concepts\n- **Elements** - Building blocks of HTML\n- **Attributes** - Additional information for elements\n- **Nesting** - Elements inside other elements', order: 1 },
      { title: 'HTML Elements & Tags', slug: 'html-elements-tags', content: '# HTML Elements & Tags\n\nLearn about the most common HTML elements and how to use them.\n\n## Text Elements\n- `<h1>` to `<h6>` - Headings\n- `<p>` - Paragraph\n- `<strong>` - Bold text\n- `<em>` - Italic text\n\n```html\n<h1>Main Heading</h1>\n<h2>Subheading</h2>\n<p>This is a <strong>bold</strong> paragraph.</p>\n```\n\n## Links & Images\n- `<a href="url">` - Links\n- `<img src="url" alt="description">` - Images', order: 2 },
      { title: 'HTML Forms & Inputs', slug: 'html-forms-inputs', content: '# HTML Forms & Inputs\n\nForms collect user input. They are essential for login, registration, search, and more.\n\n## Form Structure\n```html\n<form action="/submit" method="POST">\n  <label for="name">Name:</label>\n  <input type="text" id="name" name="name" required>\n  \n  <label for="email">Email:</label>\n  <input type="email" id="email" name="email">\n  \n  <button type="submit">Submit</button>\n</form>\n```\n\n## Input Types\n- `text`, `email`, `password`, `number`, `checkbox`, `radio`, `file`, `submit`', order: 3 },
      { title: 'Semantic HTML', slug: 'semantic-html', content: '# Semantic HTML\n\nSemantic HTML gives meaning to your content, improving accessibility and SEO.\n\n## Semantic Elements\n```html\n<header>Site header</header>\n<nav>Navigation links</nav>\n<main>Main content</main>\n<article>Article content</article>\n<section>Content section</section>\n<aside>Sidebar</aside>\n<footer>Site footer</footer>\n```\n\n## Benefits\n- Better accessibility for screen readers\n- Improved search engine rankings\n- Cleaner, more readable code', order: 4 },
    ],
  },
  {
    title: 'CSS Styling Mastery',
    slug: 'css-styling-mastery',
    description: 'From basic styling to modern layouts with Flexbox and Grid. Learn to create beautiful, responsive designs.',
    language: 'CSS',
    level: 'BEGINNER',
    order: 2,
    published: true,
    lessons: [
      { title: 'CSS Basics', slug: 'css-basics', content: '# CSS Basics\n\nCSS (Cascading Style Sheets) controls the visual presentation of web pages.\n\n## Syntax\n```css\nselector {\n  property: value;\n}\n```\n\n## Example\n```css\nh1 {\n  color: blue;\n  font-size: 32px;\n  text-align: center;\n}\n\np {\n  color: #333;\n  line-height: 1.6;\n}\n```\n\n## Ways to Add CSS\n1. **Inline** - In the HTML element\n2. **Internal** - In a `<style>` tag\n3. **External** - In a `.css` file linked via `<link>`', order: 1 },
      { title: 'Selectors & Properties', slug: 'selectors-properties', content: '# Selectors & Properties\n\n## Common Selectors\n- `element` - Select by tag name\n- `.class` - Select by class\n- `#id` - Select by ID\n- `selector1, selector2` - Multiple selectors\n- `selector1 selector2` - Descendant\n\n```css\n/* Element selector */\np { color: black; }\n\n/* Class selector */\n.highlight { background: yellow; }\n\n/* ID selector */\n#header { height: 60px; }\n\n/* Descendant */\narticle p { font-size: 14px; }\n```\n\n## Box Model\nEvery element has: content, padding, border, margin', order: 2 },
      { title: 'Flexbox Layout', slug: 'flexbox-layout', content: '# Flexbox Layout\n\nFlexbox makes one-dimensional layouts easy and predictable.\n\n## Container Properties\n```css\n.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 16px;\n  flex-wrap: wrap;\n}\n```\n\n## Item Properties\n```css\n.item {\n  flex: 1;          /* Grow equally */\n  align-self: center; /* Override alignment */\n  order: -1;        /* Change order */\n}\n```\n\n## Common Patterns\n- **Center content**: `justify-content: center; align-items: center`\n- **Navigation bar**: `justify-content: space-between`\n- **Card grid**: `flex-wrap: wrap; gap: 16px`', order: 3 },
    ],
  },
  {
    title: 'JavaScript Essentials',
    slug: 'javascript-essentials',
    description: 'Master JavaScript fundamentals: variables, functions, DOM manipulation, and modern ES6+ features.',
    language: 'JAVASCRIPT',
    level: 'BEGINNER',
    order: 3,
    published: true,
    lessons: [
      { title: 'Variables & Data Types', slug: 'js-variables', content: '# Variables & Data Types\n\nJavaScript has 3 ways to declare variables: `let`, `const`, and `var`.\n\n## Data Types\n```javascript\n// Strings\nlet name = "Alice";\n\n// Numbers\nlet age = 25;\nlet price = 19.99;\n\n// Booleans\nlet isActive = true;\n\n// Arrays\nlet fruits = ["apple", "banana", "orange"];\n\n// Objects\nlet person = {\n  name: "Bob",\n  age: 30,\n  greet() {\n    return `Hi, I\\'m ${this.name}`;\n  }\n};\n```\n\n## Best Practices\n- Use `const` by default\n- Use `let` when you need to reassign\n- Avoid `var` (outdated)', order: 1 },
      { title: 'Functions & Scope', slug: 'js-functions', content: '# Functions & Scope\n\nFunctions are reusable blocks of code.\n\n## Function Declaration\n```javascript\nfunction add(a, b) {\n  return a + b;\n}\n```\n\n## Arrow Functions\n```javascript\nconst add = (a, b) => a + b;\nconst greet = name => `Hello, ${name}!`;\n```\n\n## Scope\n- **Global** - Accessible everywhere\n- **Local** - Inside a function only\n- **Block** - Inside `{}` with `let`/`const`\n\n## Closures\nA closure is a function that remembers its outer variables even after the outer function returns.', order: 2 },
      { title: 'DOM Manipulation', slug: 'js-dom', content: '# DOM Manipulation\n\nThe DOM (Document Object Model) lets JavaScript interact with HTML.\n\n## Selecting Elements\n```javascript\n// Single element\ndocument.getElementById("header")\ndocument.querySelector(".class")\n\n// Multiple elements\ndocument.getElementsByClassName("item")\ndocument.querySelectorAll("p")\n```\n\n## Modifying Elements\n```javascript\nelement.textContent = "New text";\nelement.innerHTML = "<strong>Bold</strong>";\nelement.style.color = "red";\nelement.classList.add("active");\nelement.setAttribute("src", "image.jpg");\n```\n\n## Events\n```javascript\nbutton.addEventListener("click", () => {\n  alert("Button clicked!");\n});\n```', order: 3 },
      { title: 'ES6+ Features', slug: 'js-es6', content: '# ES6+ Features\n\nModern JavaScript features that make coding more efficient.\n\n## Destructuring\n```javascript\nconst [first, second] = [1, 2, 3];\nconst { name, age } = person;\n```\n\n## Spread Operator\n```javascript\nconst arr = [...oldArr, newItem];\nconst obj = { ...oldObj, newProp: true };\n```\n\n## Template Literals\n```javascript\nconst greeting = `Hello, ${name}! You are ${age} years old.`;\n```\n\n## Promises & Async/Await\n```javascript\nasync function fetchData() {\n  try {\n    const res = await fetch(url);\n    const data = await res.json();\n    return data;\n  } catch (error) {\n    console.error(error);\n  }\n}\n```', order: 4 },
    ],
  },
  {
    title: 'Python Programming',
    slug: 'python-programming',
    description: 'Learn Python from basics to advanced. Functions, data structures, OOP, and real-world applications.',
    language: 'PYTHON',
    level: 'BEGINNER',
    order: 4,
    published: true,
    lessons: [
      { title: 'Python Basics', slug: 'python-basics', content: '# Python Basics\n\nPython is known for its clean, readable syntax.\n\n## Variables & Data Types\n```python\n# Strings\nname = "Alice"\n\n# Numbers\nage = 25\nprice = 19.99\n\n# Booleans\nis_active = True\n\n# Lists\nfruits = ["apple", "banana", "orange"]\n\n# Dictionaries\nperson = {\n    "name": "Bob",\n    "age": 30\n}\n```\n\n## Basic Operations\n```python\nprint("Hello, World!")\ntype(variable)  # Check type\nlen(list)       # Get length\n```', order: 1 },
      { title: 'Control Flow & Loops', slug: 'python-control-flow', content: '# Control Flow & Loops\n\n## Conditionals\n```python\nif score >= 90:\n    grade = "A"\nelif score >= 80:\n    grade = "B"\nelse:\n    grade = "C"\n```\n\n## Loops\n```python\n# For loop\nfor fruit in fruits:\n    print(fruit)\n\n# While loop\ncount = 0\nwhile count < 5:\n    print(count)\n    count += 1\n\n# Range\nfor i in range(5):\n    print(i)\n\n# List comprehension\nsquares = [x**2 for x in range(10)]\n```', order: 2 },
      { title: 'Functions & Modules', slug: 'python-functions', content: '# Functions & Modules\n\n## Defining Functions\n```python\ndef greet(name):\n    """Say hello to someone"""\n    return f"Hello, {name}!"\n\n# Default parameters\ndef power(base, exp=2):\n    return base ** exp\n\n# Lambda functions\ndouble = lambda x: x * 2\n```\n\n## Modules\n```python\nimport math\nfrom datetime import datetime\nimport random\n\nmath.sqrt(16)\ndatetime.now()\nrandom.randint(1, 10)\n```\n\n## File I/O\n```python\nwith open("file.txt", "r") as f:\n    content = f.read()\n```', order: 3 },
      { title: 'Object-Oriented Python', slug: 'python-oop', content: '# Object-Oriented Python\n\n## Classes & Objects\n```python\nclass Student:\n    def __init__(self, name, grade):\n        self.name = name\n        self.grade = grade\n    \n    def introduce(self):\n        return f"Hi, I\\'m {self.name} and I\\'m in grade {self.grade}"\n\n# Create object\nstudent = Student("Alice", 10)\nprint(student.introduce())\n```\n\n## Inheritance\n```python\nclass HighSchoolStudent(Student):\n    def __init__(self, name, grade, school):\n        super().__init__(name, grade)\n        self.school = school\n```\n\n## Special Methods\n```python\ndef __str__(self):\n    return self.name\n\ndef __len__(self):\n    return len(self.name)\n```', order: 4 },
    ],
  },
  {
    title: 'Advanced JavaScript',
    slug: 'advanced-javascript',
    description: 'Deep dive into advanced JS: closures, prototypes, async patterns, promises, and modern frameworks concepts.',
    language: 'JAVASCRIPT',
    level: 'ADVANCED',
    order: 5,
    published: true,
    lessons: [
      { title: 'Closures & Hoisting', slug: 'js-closures', content: '# Closures & Hoisting\n\n## Hoisting\nJavaScript moves declarations to the top of their scope during compilation.\n\n```javascript\nconsole.log(x); // undefined (not error)\nvar x = 5;\n\n// let and const are hoisted but not initialized\n// console.log(y); // ReferenceError\nlet y = 10;\n```\n\n## Closures in Depth\nA closure is created when a function retains access to its lexical scope.\n\n```javascript\nfunction createCounter() {\n  let count = 0;\n  return {\n    increment: () => ++count,\n    decrement: () => --count,\n    getCount: () => count,\n  };\n}\n\nconst counter = createCounter();\nconsole.log(counter.increment()); // 1\nconsole.log(counter.increment()); // 2\n```\n\n## Practical Uses\n- Data encapsulation\n- Function factories\n- Module pattern', order: 1 },
      { title: 'Async Patterns', slug: 'js-async', content: '# Async Patterns\n\n## Callbacks\nThe traditional async pattern.\n\n```javascript\nfunction fetchData(callback) {\n  setTimeout(() => {\n    callback("Data received");\n  }, 1000);\n}\n```\n\n## Promises\n```javascript\nconst promise = new Promise((resolve, reject) => {\n  // Async operation\n  if (success) resolve(data);\n  else reject(error);\n});\n\npromise.then(data => console.log(data))\n       .catch(err => console.error(err));\n```\n\n## Promise Methods\n- `Promise.all()` - Wait for all promises\n- `Promise.race()` - First to resolve/reject\n- `Promise.allSettled()` - Wait for all (no reject)\n\n## Async/Await\n```javascript\nasync function getUsers() {\n  const res = await fetch(\"/api/users\");\n  const data = await res.json();\n  return data;\n}\n```', order: 2 },
    ],
  },
  {
    title: 'Advanced Python',
    slug: 'advanced-python',
    description: 'Advanced Python: decorators, generators, context managers, threading, and design patterns.',
    language: 'PYTHON',
    level: 'ADVANCED',
    order: 6,
    published: true,
    lessons: [
      { title: 'Decorators & Generators', slug: 'python-decorators', content: '# Decorators & Generators\n\n## Decorators\nFunctions that modify other functions.\n\n```python\ndef timer(func):\n    def wrapper(*args, **kwargs):\n        import time\n        start = time.time()\n        result = func(*args, **kwargs)\n        print(f"{func.__name__} took {time.time() - start}s")\n        return result\n    return wrapper\n\n@timer\ndef slow_function():\n    import time\n    time.sleep(1)\n    return "Done"\n```\n\n## Generators\nMemory-efficient iterators.\n\n```python\ndef fibonacci(n):\n    a, b = 0, 1\n    for _ in range(n):\n        yield a\n        a, b = b, a + b\n\nfor num in fibonacci(10):\n    print(num)\n```\n\n## Context Managers\n```python\nwith open("file.txt", "r") as f:\n    content = f.read()\n```', order: 1 },
    ],
  },
]

async function main() {
  console.log('Seeding database...')

  for (const courseData of coursesData) {
    const { lessons, ...courseInfo } = courseData
    const course = await prisma.course.create({ data: courseInfo })
    console.log(`Created course: ${course.title}`)

    for (const lesson of lessons) {
      await prisma.lesson.create({
        data: { ...lesson, courseId: course.id },
      })
      console.log(`  Created lesson: ${lesson.title}`)
    }
  }

  console.log('Seeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
